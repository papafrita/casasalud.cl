import { prisma } from "@/lib/prisma";

async function execute() {
    const provider = await prisma.user.findFirst({
        where: { role: 'PROVIDER' },
        include: { profiles: true }
    });

    if (provider) {
        console.log('Provider Credentials:');
        console.log('Email:', provider.email);
        console.log('Role:', provider.role);
        console.log('Password (since this is local we can check the hash, but let\'s see if a default was set in seed)');
        console.log('Hash:', provider.passwordHash);
        console.log('Profile Slug:', provider.profiles[0]?.slug);
    }

    // Check patients
    const patient = await prisma.user.findFirst({
        where: { role: 'PATIENT' }
    });
    if (patient) {
        console.log('\nPatient Credentials:');
        console.log('Email:', patient.email);
        console.log('Role:', patient.role);
    }
}

execute()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
