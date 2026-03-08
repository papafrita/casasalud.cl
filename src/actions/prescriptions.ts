'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

async function getSessionProviderId() {
    const user = await prisma.user.findFirst({
        where: { role: 'PROVIDER' }
    });
    if (!user) throw new Error("No provider found in database.");
    return user.id;
}

export async function createPrescription(formData: FormData) {
    const providerId = await getSessionProviderId();

    const patientId = formData.get('patientId') as string;
    const type = formData.get('type') as string; // "SIMPLE" | "RETAINED" | "EXAM" | "CERTIFICATE"
    const content = formData.get('content') as string;
    const status = 'ACTIVE';

    if (!patientId || !content) {
        throw new Error('Missing require fields for prescription');
    }

    const prescription = await prisma.medicalPrescription.create({
        data: {
            providerId,
            patientId,
            type,
            content,
            status
        }
    });

    // Law 19.628: Trigger an Audit Log when a prescription (sensible data) is generated
    await prisma.auditLog.create({
        data: {
            actorId: providerId,
            action: `CREATED_PRESCRIPTION_${type}`,
            targetId: prescription.id
        }
    });

    revalidatePath('/dashboard/prescriptions');
}

export async function archivePrescription(id: string) {
    const providerId = await getSessionProviderId();

    const existing = await prisma.medicalPrescription.findUnique({ where: { id } });
    if (!existing || existing.providerId !== providerId) {
        throw new Error('Unauthorized');
    }

    await prisma.medicalPrescription.update({
        where: { id },
        data: { status: 'ARCHIVED' }
    });

    revalidatePath('/dashboard/prescriptions');
}
