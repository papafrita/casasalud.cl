import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        let session = await getSession();
        let providerId = session?.userId;

        // Fallback for local testing (matches UI behavior)
        if (!providerId) {
            const firstProvider = await prisma.user.findFirst({ where: { role: 'PROVIDER' } });
            providerId = firstProvider?.id;
        }

        if (!providerId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const services = await prisma.service.findMany({
            where: { providerId },
            orderBy: { name: 'asc' }
        });
        return NextResponse.json(services);
    } catch (error) {
        console.error("Error fetching services:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
