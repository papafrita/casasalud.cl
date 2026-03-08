'use server';

import { getAvailableSlots } from '@/lib/availability';
import { lockBookingSlot } from '@/lib/redis';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function fetchSlotsAction(slug: string, dateStr: string) {
    const profile = await prisma.profile.findUnique({
        where: { slug },
    });

    if (!profile) {
        throw new Error('Profile not found');
    }

    const slots = await getAvailableSlots(profile.userId, dateStr);
    return slots;
}

export async function lockSlotAction(slug: string, slotStartTime: string) {
    const session = await getSession();
    if (!session || !session.user) {
        throw new Error('Unauthorized');
    }

    const patientId = session.user.id;

    const profile = await prisma.profile.findUnique({
        where: { slug },
    });

    if (!profile) {
        throw new Error('Profile not found');
    }

    const locked = await lockBookingSlot(profile.userId, slotStartTime);
    if (!locked) return false;

    // Create the actual Appointment record
    const slotDate = new Date(slotStartTime);
    const endTime = new Date(slotDate.getTime() + 30 * 60000); // 30 mins defaults for MVP

    await prisma.appointment.create({
        data: {
            providerId: profile.userId,
            patientId: patientId,
            startTime: slotDate,
            endTime: endTime,
            status: "PENDING_PAYMENT",
        }
    });

    return true;
}

export async function getProviderProfile(slug: string) {
    const profile = await prisma.profile.findUnique({
        where: { slug },
        include: {
            user: {
                select: {
                    email: true,
                }
            }
        }
    });

    return profile;
}
