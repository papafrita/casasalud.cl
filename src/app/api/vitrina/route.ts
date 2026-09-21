import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const profile = await prisma.profile.findFirst({
            where: { userId: session.userId }
        });

        if (!profile) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        return NextResponse.json(profile);
    } catch (error) {
        console.error("Error fetching profile:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();

        const profile = await prisma.profile.findFirst({
            where: { userId: session.userId }
        });

        if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

        const updatedProfile = await prisma.profile.update({
            where: { id: profile.id },
            data: {
                fullName: data.fullName,
                specialty: data.specialty,
                bio: data.bio,
                // Using a mock config settings approach for demonstration
                searchSettings: {
                    isPubliclyVisible: data.isPubliclyVisible ?? true,
                    themeColor: data.themeColor || "blue",
                    showReviews: data.showReviews ?? true,
                }
            }
        });

        return NextResponse.json({ success: true, profile: updatedProfile });
    } catch (error) {
        console.error("Error updating profile vitrina specs:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
