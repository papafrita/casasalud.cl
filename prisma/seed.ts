import { PrismaClient, Role, AppointmentStatus } from '@prisma/client';
import { addDays, subDays, set } from 'date-fns';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Clearing existing data...');
    // In a real scenario we'd use TRUNCATE, but this works for development
    await prisma.payment.deleteMany();
    await prisma.medicalPrescription.deleteMany();
    await prisma.appointment.deleteMany();
    await prisma.service.deleteMany();
    await prisma.availabilityRule.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.user.deleteMany();

    console.log('Seeding new data...');

    const defaultPasswordHash = await bcrypt.hash('password123', 10);

    // 1. Create Providers
    const provider1 = await prisma.user.create({
        data: {
            email: 'admin@casasalud.cl',
            name: 'Dr. Tomás Valdés',
            passwordHash: defaultPasswordHash,
            role: Role.PROVIDER,
            profiles: {
                create: {
                    slug: 'dr-tomas-valdes',
                    fullName: 'Dr. Tomás Valdés',
                    specialty: 'Medicina General Integrativa',
                    bio: 'Atención online y presencial enfocada en la salud integral del paciente.',
                    sisId: '12345678-9',
                }
            }
        }
    });

    const provider2 = await prisma.user.create({
        data: {
            email: 'psicologia@casasalud.cl',
            name: 'Ps. Ana Rojas',
            passwordHash: defaultPasswordHash,
            role: Role.PROVIDER,
            profiles: {
                create: {
                    slug: 'ps-ana-rojas',
                    fullName: 'Ps. Ana Rojas',
                    specialty: 'Psicología Clínica',
                    bio: 'Especialista en ansiedad y manejo del estrés. Terapia cognitivo-conductual.',
                    sisId: '13345678-1',
                }
            }
        }
    });

    const provider3 = await prisma.user.create({
        data: {
            email: 'nutricion@casasalud.cl',
            name: 'Nut. Camila Silva',
            passwordHash: defaultPasswordHash,
            role: Role.PROVIDER,
            profiles: {
                create: {
                    slug: 'nut-camila-silva',
                    fullName: 'Nut. Camila Silva',
                    specialty: 'Nutrición',
                    bio: 'Acompañamiento nutricional integral y alimentación intuitiva.',
                    sisId: '14345678-2',
                }
            }
        }
    });

    // Create Availability Rules for providers
    const providers = [provider1, provider2, provider3];
    for (const p of providers) {
        // Available Monday to Friday (1-5) from 09:00 to 17:00
        for (let day = 1; day <= 5; day++) {
            await prisma.availabilityRule.create({
                data: {
                    providerId: p.id,
                    dayOfWeek: day,
                    startTime: new Date(`1970-01-01T09:00:00.000Z`),
                    endTime: new Date(`1970-01-01T17:00:00.000Z`),
                }
            });
        }
    }

    // 2. Create Services
    const service1 = await prisma.service.create({
        data: {
            providerId: provider1.id,
            name: 'Consulta Presencial MGI',
            durationMin: 45,
            price: 35000,
            type: 'IN_PERSON',
            requiresBoleta: true,
            isPublic: true,
        }
    });

    const service2 = await prisma.service.create({
        data: {
            providerId: provider1.id,
            name: 'Telemedicina',
            durationMin: 30,
            price: 25000,
            type: 'ONLINE',
            requiresBoleta: true,
            isPublic: true,
        }
    });

    const service3 = await prisma.service.create({
        data: {
            providerId: provider2.id,
            name: 'Sesión Psicológica Online',
            durationMin: 60,
            price: 40000,
            type: 'ONLINE',
            requiresBoleta: true,
            isPublic: true,
        }
    });

    const service4 = await prisma.service.create({
        data: {
            providerId: provider3.id,
            name: 'Evaluación Nutricional',
            durationMin: 45,
            price: 30000,
            type: 'ONLINE',
            requiresBoleta: true,
            isPublic: true,
        }
    });

    // 3. Create Patients
    const patients = [];
    const patientNames = ['María González', 'Juan Pérez', 'Camila Soto', 'Diego Ramírez'];
    for (let i = 0; i < patientNames.length; i++) {
        const patient = await prisma.user.create({
            data: {
                email: `paciente${i + 1}@correo.com`,
                name: patientNames[i],
                passwordHash: defaultPasswordHash,
                phone: '+56912345678',
                role: Role.PATIENT,
            }
        });
        patients.push(patient);
    }

    // 4. Create Appointments (Past & Future)
    const today = new Date();

    // Past Appointment (Completed)
    const appt1 = await prisma.appointment.create({
        data: {
            providerId: provider1.id,
            patientId: patients[0].id,
            serviceId: service1.id,
            startTime: set(subDays(today, 2), { hours: 10, minutes: 0, seconds: 0, milliseconds: 0 }),
            endTime: set(subDays(today, 2), { hours: 10, minutes: 45, seconds: 0, milliseconds: 0 }),
            status: AppointmentStatus.COMPLETED,
        }
    });

    // Future Appointment (Confirmed) - Provider 1
    const appt2 = await prisma.appointment.create({
        data: {
            providerId: provider1.id,
            patientId: patients[1].id,
            serviceId: service2.id,
            startTime: set(addDays(today, 1), { hours: 15, minutes: 0, seconds: 0, milliseconds: 0 }),
            endTime: set(addDays(today, 1), { hours: 15, minutes: 30, seconds: 0, milliseconds: 0 }),
            status: AppointmentStatus.CONFIRMED,
        }
    });

    // Future Appointment - Provider 2
    await prisma.appointment.create({
        data: {
            providerId: provider2.id,
            patientId: patients[2].id,
            serviceId: service3.id,
            startTime: set(addDays(today, 2), { hours: 11, minutes: 0, seconds: 0, milliseconds: 0 }),
            endTime: set(addDays(today, 2), { hours: 12, minutes: 0, seconds: 0, milliseconds: 0 }),
            status: AppointmentStatus.CONFIRMED,
        }
    });

    // Future Appointment (Pending Payment) - Provider 1
    const appt3 = await prisma.appointment.create({
        data: {
            providerId: provider1.id,
            patientId: patients[2].id,
            serviceId: service1.id,
            startTime: set(addDays(today, 3), { hours: 9, minutes: 0, seconds: 0, milliseconds: 0 }),
            endTime: set(addDays(today, 3), { hours: 9, minutes: 45, seconds: 0, milliseconds: 0 }),
            status: AppointmentStatus.PENDING_PAYMENT,
        }
    });

    // 5. Create Payments
    await prisma.payment.create({
        data: {
            providerId: provider1.id,
            patientId: patients[0].id,
            appointmentId: appt1.id,
            amount: service1.price,
            status: 'DEPOSITED',
            boletaEmitted: true,
            boletaNumber: 'B-10293',
            depositDate: subDays(today, 1),
        }
    });

    await prisma.payment.create({
        data: {
            providerId: provider1.id,
            patientId: patients[1].id,
            appointmentId: appt2.id,
            amount: service2.price,
            status: 'PAID',
            boletaEmitted: false,
        }
    });

    // 6. Create Prescriptions
    await prisma.medicalPrescription.create({
        data: {
            providerId: provider1.id,
            patientId: patients[0].id,
            type: 'SIMPLE',
            content: 'Ibuprofeno 400mg c/8h por 5 días',
            status: 'VIGENTE',
            issuedAt: subDays(today, 2),
        }
    });

    await prisma.medicalPrescription.create({
        data: {
            providerId: provider1.id,
            patientId: patients[0].id,
            type: 'EXAM',
            content: 'Perfil Bioquímico, Hemograma Completo',
            status: 'VIGENTE',
            issuedAt: subDays(today, 2),
        }
    });

    console.log('Seed completed successfully! 🌱');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
