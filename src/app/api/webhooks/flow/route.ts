import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { flowClient } from '@/lib/flow';
import { emitOpenFacturaBoleta } from '@/lib/openfactura';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const token = formData.get('token') as string;

        if (!token) {
            return NextResponse.json({ error: 'Missing token' }, { status: 400 });
        }

        // Normally, taking the token and calling Flow /payment/getStatus to securely fetch the true status.
        // For Phase 3 MVP, we will simulate the validation assuming the provider was already checked.

        // Let's pretend Flow told us the commerceOrder was our Appointment ID and status is 2 (Paid).
        const simulatedAppointmentId = 'MVP-simulated-id';

        /* 
        const statusData = await flowClient.getPaymentStatus(token);
        if(statusData.status === 2) {
            const appointment = await prisma.appointment.update({
                where: { id: statusData.commerceOrder },
                data: { status: 'CONFIRMED', paymentId: token }
            });
            await emitOpenFacturaBoleta(appointment);
        }
        */

        return NextResponse.json({ success: true, processed: true });

    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
    }
}
