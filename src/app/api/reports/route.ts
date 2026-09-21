import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // In a real application, you'd aggregate real payment data based on date ranges
        // For this demonstration, we return a standard set of reports an admin would see
        const currentYear = new Date().getFullYear();

        const reports = [
            { id: '1', name: `Resumen de atenciones ${currentYear}`, type: 'Resumen anual', date: new Date().toISOString(), size: '2.4 MB' },
            { id: '2', name: `Detalle de pagos Marzo ${currentYear}`, type: 'Liquidación mensual', date: new Date().toISOString(), size: '845 KB' },
            { id: '3', name: `Detalle de pagos Febrero ${currentYear}`, type: 'Liquidación mensual', date: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(), size: '1.2 MB' },
            { id: '4', name: `Detalle de pagos Enero ${currentYear}`, type: 'Liquidación mensual', date: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString(), size: '920 KB' },
            { id: '5', name: `Resumen de atenciones ${currentYear - 1}`, type: 'Resumen anual', date: new Date(new Date().setFullYear(currentYear - 1)).toISOString(), size: '4.1 MB' },
        ];

        return NextResponse.json(reports);
    } catch (error) {
        console.error("Error fetching reports:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
