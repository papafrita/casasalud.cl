'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Mock function to represent fetching the current logged-in provider
// In a real app, this would use next-auth session or similar
async function getSessionProviderId() {
    // We fetch any provider for the MVP simulation
    const user = await prisma.user.findFirst({
        where: { role: 'PROVIDER' }
    });
    if (!user) throw new Error("No provider found in database.");
    return user.id;
}

export async function createService(formData: FormData) {
    const providerId = await getSessionProviderId();

    const name = formData.get('name') as string;
    const type = formData.get('type') as string;
    const durationMin = parseInt(formData.get('durationMin') as string, 10);
    const price = parseFloat(formData.get('price') as string);
    const requiresBoleta = formData.get('requiresBoleta') === 'on';
    const isPublic = formData.get('isPublic') === 'on';

    if (!name || isNaN(durationMin) || isNaN(price)) {
        throw new Error('Invalid input data');
    }

    await prisma.service.create({
        data: {
            providerId,
            name,
            type,
            durationMin,
            price,
            requiresBoleta,
            isPublic
        }
    });

    revalidatePath('/dashboard/services');
}

export async function deleteService(id: string) {
    const providerId = await getSessionProviderId();

    // Verify ownership
    const service = await prisma.service.findUnique({ where: { id } });
    if (!service || service.providerId !== providerId) {
        throw new Error("Unauthorized or not found");
    }

    await prisma.service.delete({
        where: { id }
    });

    revalidatePath('/dashboard/services');
}
