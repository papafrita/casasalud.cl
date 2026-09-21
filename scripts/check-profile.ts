import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkData() {
    const providers = await prisma.user.findMany({
        where: { role: 'PROVIDER' },
        include: { profiles: true }
    });

    console.log("Found providers:", JSON.stringify(providers, null, 2));
}

checkData()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
