import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session || !session.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const rules = await prisma.availabilityRule.findMany({
            where: { providerId: session.userId },
            orderBy: { dayOfWeek: 'asc' }
        });
        return NextResponse.json(rules);
    } catch (error) {
        console.error("Error fetching availability:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session || !session.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const data = await req.json();

        // Remove existing rules
        await prisma.availabilityRule.deleteMany({
            where: { providerId: session.userId }
        });

        const newRules = await Promise.all(
            data.map(async (rule: any) => {
                const [startH, startM] = rule.startTime.split(":");
                const [endH, endM] = rule.endTime.split(":");

                // Create a standard date and set the times
                const startDate = new Date();
                startDate.setUTCHours(Number(startH), Number(startM), 0, 0);

                const endDate = new Date();
                endDate.setUTCHours(Number(endH), Number(endM), 0, 0);

                return prisma.availabilityRule.create({
                    data: {
                        providerId: session.userId,
                        dayOfWeek: rule.dayOfWeek,
                        startTime: startDate,
                        endTime: endDate
                    }
                });
            })
        );

        return NextResponse.json(newRules, { status: 201 });
    } catch (error) {
        console.error("Error saving availability:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
