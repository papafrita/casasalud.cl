'use server';

import { getAvailableSlots } from '@/lib/availability';
import { lockBookingSlot } from '@/lib/redis';
import { prisma } from '@/lib/prisma';
import { getSession, setSession } from '@/lib/auth';
import { sendAppointmentEmails } from '@/lib/email';
import bcrypt from 'bcryptjs';

export async function fetchSlotsAction(slug: string, dateStr: string, serviceId?: string) {
    const profile = await prisma.profile.findUnique({
        where: { slug },
    });

    if (!profile) {
        throw new Error('Profile not found');
    }

    let durationMin = 30; // default
    if (serviceId) {
        const service = await prisma.service.findUnique({ where: { id: serviceId } });
        if (service) {
            durationMin = service.durationMin;
        }
    }

    const slots = await getAvailableSlots(profile.userId, dateStr, durationMin);
    return slots;
}

export async function fetchProviderServicesAction(slug: string) {
    const profile = await prisma.profile.findUnique({
        where: { slug },
        select: { userId: true }
    });
    
    if (!profile) return [];
    
    return await prisma.service.findMany({
        where: { providerId: profile.userId, isPublic: true },
        select: { id: true, name: true, durationMin: true, price: true, type: true }
    });
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

export async function guestCheckoutAction(
    slug: string, 
    slotStartTime: string, 
    serviceId: string,
    patientInfo: { name: string; email: string; password?: string; isLoginMode?: boolean }
) {
    const profile = await prisma.profile.findUnique({
        where: { slug },
        include: { user: true }
    });

    if (!profile) {
        return { error: 'Profesional no encontrado' };
    }

    let user = await prisma.user.findUnique({ where: { email: patientInfo.email } });
    
    if (patientInfo.isLoginMode) {
        if (!user || !user.passwordHash) {
             return { error: 'Credenciales inválidas.' };
        }
        const isValid = await bcrypt.compare(patientInfo.password || '', user.passwordHash);
        if (!isValid) {
            return { error: 'Contraseña incorrecta.' };
        }
    } else {
        if (user) {
            return { error: 'El correo ya está registrado. Por favor, inicia sesión.' };
        }
        if (!patientInfo.password) {
            return { error: 'Por favor, ingresa una contraseña para crear tu cuenta.' };
        }
        const passwordHash = await bcrypt.hash(patientInfo.password, 10);
        user = await prisma.user.create({
            data: {
                email: patientInfo.email,
                name: patientInfo.name,
                passwordHash,
                role: 'PATIENT',
            },
        });
    }

    // Set session (log them in)
    await setSession({ id: user.id, email: user.email, role: user.role });

    const locked = await lockBookingSlot(profile.userId, slotStartTime);
    if (!locked) {
        return { error: 'El horario seleccionado ya no está disponible.' };
    }

    // Use service duration
    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    const slotDate = new Date(slotStartTime);
    const endTime = new Date(slotDate.getTime() + (service?.durationMin || 30) * 60000);

    await prisma.appointment.create({
        data: {
            providerId: profile.userId,
            patientId: user.id,
            serviceId: serviceId,
            startTime: slotDate,
            endTime: endTime,
            status: "PENDING_PAYMENT",
        }
    });

    // Send confirmation emails
    try {
        await sendAppointmentEmails(
            user.email,
            profile.user.email,
            {
                date: slotDate.toISOString(),
                serviceName: service?.name || 'Servicio Médico',
                patientName: user.name || 'Paciente',
            }
        );
    } catch (error) {
        console.error('Error enviando correos post-reserva:', error);
    }

    return { success: true };
}

export async function authenticatedCheckoutAction(slug: string, slotStartTime: string, serviceId: string) {
    const session = await getSession();
    if (!session || !session.user) {
        return { error: 'No autorizado' };
    }

    const patientId = session.user.id;
    const profile = await prisma.profile.findUnique({ 
        where: { slug },
        include: { user: true }
    });
    if (!profile) return { error: 'Proveedor no encontrado' };

    const locked = await lockBookingSlot(profile.userId, slotStartTime);
    if (!locked) return { error: 'El horario seleccionado ya no está disponible.' };

    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    const slotDate = new Date(slotStartTime);
    const endTime = new Date(slotDate.getTime() + (service?.durationMin || 30) * 60000);

    await prisma.appointment.create({
        data: {
            providerId: profile.userId,
            patientId: patientId,
            serviceId: serviceId,
            startTime: slotDate,
            endTime: endTime,
            status: "PENDING_PAYMENT",
        }
    });

    // User data is needed for email sending
    const patient = await prisma.user.findUnique({ where: { id: patientId } });

    if (patient) {
        try {
            await sendAppointmentEmails(
                patient.email,
                profile.user.email,
                {
                    date: slotDate.toISOString(),
                    serviceName: service?.name || 'Servicio Médico',
                    patientName: patient.name || 'Paciente',
                }
            );
        } catch (error) {
            console.error('Error enviando correos post-reserva (auth checkout):', error);
        }
    }

    return { success: true };
}
