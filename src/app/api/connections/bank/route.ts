import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getSession } from "../../../../lib/auth";

export async function GET(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const bankDetails = await prisma.bankDetails.findUnique({
            where: { providerId: session.userId }
        });

        return NextResponse.json(bankDetails || {});
    } catch (error) {
        console.error("Error fetching bank details:", error);
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

        const bankDetails = await prisma.bankDetails.upsert({
            where: { providerId: session.userId },
            update: {
                bankName: data.bankName,
                accountType: data.accountType,
                accountNumber: data.accountNumber,
                rut: data.rut,
                fullName: data.fullName,
                email: data.email,
            },
            create: {
                providerId: session.userId,
                bankName: data.bankName,
                accountType: data.accountType,
                accountNumber: data.accountNumber,
                rut: data.rut,
                fullName: data.fullName,
                email: data.email,
            }
        });

        return NextResponse.json(bankDetails);
    } catch (error) {
        console.error("Error updating bank details:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
