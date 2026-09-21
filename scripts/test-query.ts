import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkData() {
    const profile = await prisma.profile.findFirst({
        where: { user: { role: 'PROVIDER' } }
    });

    console.log("Found profile with relation query:", JSON.stringify(profile, null, 2));

    const directProfile = await prisma.user.findFirst({
        where: { role: 'PROVIDER' },
        include: { profiles: true }
    });
    console.log("Found profile via user query:", JSON.stringify(directProfile, null, 2));
}

checkData()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
