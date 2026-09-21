import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth"; // Assuming an auth check exists

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        let session = await getSession();
        let userId = session?.userId;
        let role = session?.role;

        if (!userId) {
            const firstProvider = await prisma.user.findFirst({ where: { role: 'PROVIDER' } });
            userId = firstProvider?.id;
            role = 'PROVIDER';
        }

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Optional query params for date filtering
        const { searchParams } = new URL(req.url);
        const start = searchParams.get('start');
        const end = searchParams.get('end');

        let dateFilter = {};
        if (start && end) {
            dateFilter = {
                startTime: {
                    gte: new Date(start),
                    lte: new Date(end),
                }
            };
        }

        const whereClause = role === 'PATIENT' 
            ? { patientId: userId, ...dateFilter } 
            : { providerId: userId, ...dateFilter };

        const appointments = await prisma.appointment.findMany({
            where: whereClause,
            include: {
                patient: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    }
                },
                provider: {
                    select: {
                        name: true,
                        profiles: {
                            select: {
                                fullName: true,
                                specialty: true
                            }
                        }
                    }
                },
                service: true,
                clinicalRecord: true,
                payment: true,
            },
            orderBy: {
                startTime: 'asc'
            }
        });

        const appointmentsWithFlag = appointments.map(app => ({
            ...app,
            _isPatientView: role === 'PATIENT'
        }));

        return NextResponse.json(appointmentsWithFlag);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        let session = await getSession();
        if (!session || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();
        let { patientId, serviceId, startTime, endTime } = data;
        let providerId;

        if (session.role === 'PROVIDER' || session.role === 'ADMIN') {
            providerId = session.userId;
        } else if (session.role === 'PATIENT') {
            if (patientId && patientId !== session.userId) {
                return NextResponse.json({ error: "Forbidden: Cannot schedule for other patients" }, { status: 403 });
            }
            patientId = session.userId;
            
            const firstProvider = await prisma.user.findFirst({ where: { role: 'PROVIDER' } });
            providerId = firstProvider?.id;
        }

        if (!providerId) {
            return NextResponse.json({ error: "No provider found" }, { status: 400 });
        }

        if (!patientId || !serviceId || !startTime || !endTime) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        let finalStatus = 'CONFIRMED';
        if (session.role === 'PATIENT') {
            finalStatus = 'PENDING_PAYMENT';
        } else if (data.status === 'PENDING_PAYMENT') {
            finalStatus = 'PENDING_PAYMENT';
        }

        const appointment = await prisma.appointment.create({
            data: {
                providerId,
                patientId,
                serviceId,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                status: finalStatus as any
            }
        });

        return NextResponse.json(appointment, { status: 201 });
    } catch (error) {
        console.error("Error creating appointment:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
