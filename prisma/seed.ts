import { PrismaClient, Role } from '@prisma/client';
import { addDays, set } from 'date-fns';

const prisma = new PrismaClient();

async function main() {
    // Create a provider
    const provider = await prisma.user.create({
        data: {
            email: 'dr.perez@casasalud.cl',
            role: Role.PROVIDER,
            profiles: {
                create: {
                    slug: 'dr-perez',
                    fullName: 'Dr. Juan Pérez',
                    specialty: 'Medicina General Integrativa',
                    bio: 'Más de 10 años de experiencia acompañando procesos de salud con una mirada integral y respetuosa. Atención online para todo Chile.',
                }
            }
        }
    });

    console.log(`Created provider: ${provider.id}`);

    // Create availability rules (Monday to Friday, 09:00 to 13:00)
    for (let day = 1; day <= 5; day++) {
        // We store UTC times. 09:00 CLST is 12:00 UTC (or 13:00 UTC depending on DST). 
        // Let's just create generic Date objects. Prisma db.Time just uses the time portion.
        const startTime = new Date('1970-01-01T12:00:00.000Z'); // 09:00 Local
        const endTime = new Date('1970-01-01T16:00:00.000Z');   // 13:00 Local

        await prisma.availabilityRule.create({
            data: {
                providerId: provider.id,
                dayOfWeek: day,
                startTime,
                endTime,
            }
        });
    }

    console.log(`Created availability rules for provider.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
