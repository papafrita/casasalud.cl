import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        let session = await getSession();
        if (!session || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (session.role === 'PATIENT') {
            const patient = await prisma.user.findUnique({
                where: { id: session.userId },
                select: { id: true, name: true, email: true }
            });
            return NextResponse.json(patient ? [patient] : []);
        }

        const patients = await prisma.user.findMany({
            where: { role: 'PATIENT' },
            select: { id: true, name: true, email: true },
            orderBy: { name: 'asc' }
        });

        return NextResponse.json(patients);
    } catch (error) {
        console.error("Error fetching patients:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (session.role === 'PATIENT') {
            return NextResponse.json({ error: "Forbidden: Patients cannot create other patients" }, { status: 403 });
        }

        const body = await req.json();
        const { name, email, phone } = body;

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Check if user already exists
        let patient = await prisma.user.findUnique({ where: { email } });
        
        if (!patient) {
            patient = await prisma.user.create({
                data: {
                    name,
                    email,
                    phone,
                    role: 'PATIENT',
                }
            });

            await prisma.profile.create({
                data: {
                    userId: patient.id,
                    slug: `patient-${patient.id}`,
                    fullName: name || email,
                    specialty: 'Paciente',
                }
            });
        }

        return NextResponse.json(patient);
    } catch (error) {
        console.error("Error creating patient:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
