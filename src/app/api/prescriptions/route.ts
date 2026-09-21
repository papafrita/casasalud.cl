import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const prescriptions = await prisma.medicalPrescription.findMany({
            where: { providerId: session.userId },
            include: {
                patient: {
                    select: {
                        name: true,
                        profiles: {
                            select: {
                                fullName: true,
                                sisId: true,
                            }
                        }
                    }
                }
            },
            orderBy: { issuedAt: 'desc' }
        });

        const mapped = prescriptions.map(p => ({
            id: p.id,
            id_string: p.displayId.toString().padStart(3, '0'),
            createdAt: p.issuedAt.toISOString(),
            patient: {
                name: p.patient.profiles[0]?.fullName || p.patient.name || 'Paciente',
                rut: p.patient.profiles[0]?.sisId || 'N/A'
            },
            type: p.type,
            status: p.status
        }));

        return NextResponse.json(mapped);
    } catch (error) {
        console.error("Error fetching prescriptions:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();

        const prescription = await prisma.medicalPrescription.create({
            data: {
                providerId: session.userId,
                patientId: data.patientId,
                content: data.content,
                type: data.type || "SIMPLE",
                status: data.status || "ACTIVE",
            }
        });

        return NextResponse.json(prescription, { status: 201 });
    } catch (error) {
        console.error("Error creating prescription:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
