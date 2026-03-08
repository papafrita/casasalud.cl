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

export async function createDigitalProduct(formData: FormData) {
    const providerId = await getSessionProviderId();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const fileUrl = formData.get('fileUrl') as string | null;

    if (!title || !description || isNaN(price)) {
        throw new Error('Invalid product data');
    }

    await prisma.digitalProduct.create({
        data: {
            providerId,
            title,
            description,
            price,
            fileUrl
        }
    });

    revalidatePath('/dashboard/store');
}

export async function deleteDigitalProduct(id: string) {
    const providerId = await getSessionProviderId();

    const product = await prisma.digitalProduct.findUnique({ where: { id } });
    if (!product || product.providerId !== providerId) {
        throw new Error("Unauthorized");
    }

    await prisma.digitalProduct.delete({
        where: { id }
    });

    revalidatePath('/dashboard/store');
}
