import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getSession();
        if (!session || !session.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const data = await req.json();

        // Ensure we only update appointments for this provider
        const appointmentCount = await prisma.appointment.updateMany({
            where: { id: params.id, providerId: session.userId },
            data: {
                ...(data.startTime && { startTime: new Date(data.startTime) }),
                ...(data.endTime && { endTime: new Date(data.endTime) })
            }
        });

        if (appointmentCount.count === 0) {
            return NextResponse.json({ error: "Appointment not found or unauthorized" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating appointment:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
