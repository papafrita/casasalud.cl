import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Fetch all payments for this provider
        const payments = await prisma.payment.findMany({
            where: { providerId: session.userId },
            include: {
                patient: {
                    select: { name: true, email: true }
                },
                appointment: {
                    include: { service: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(payments);
    } catch (error) {
        console.error("Error fetching finances:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
