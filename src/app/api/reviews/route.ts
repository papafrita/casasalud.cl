import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        const [reviews, totalCount] = await Promise.all([
            prisma.review.findMany({
                where: { providerId: session.userId },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.review.count({
                where: { providerId: session.userId }
            })
        ]);

        return NextResponse.json({
            reviews,
            pagination: {
                total: totalCount,
                page,
                limit,
                totalPages: Math.ceil(totalCount / limit)
            }
        });

    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
