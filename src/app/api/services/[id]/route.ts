import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getSession();
        if (!session || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const service = await prisma.service.findFirst({
            where: {
                id: params.id,
                providerId: session.userId,
            }
        });

        if (!service) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        return NextResponse.json(service);
    } catch (error) {
        console.error("Error fetching service:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getSession();
        if (!session || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();

        const updatedService = await prisma.service.updateMany({
            where: {
                id: params.id,
                providerId: session.userId,
            },
            data: {
                name: data.name,
                durationMin: Number(data.durationMin),
                price: Number(data.price),
                type: data.type,
                requiresBoleta: Boolean(data.requiresBoleta),
                locationDetails: data.locationDetails,
                billingDetails: data.billingDetails,
                remindersEnabled: Boolean(data.remindersEnabled),
                reminderChannels: data.reminderChannels || [],
            }
        });

        if (updatedService.count === 0) {
            return NextResponse.json({ error: "Service not found or unauthorized" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating service:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
