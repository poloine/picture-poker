import prisma from "../prisma/client.js";

const cleanup = async () => {
    const now = new Date();
    const result = await prisma.user.updateMany({
        where: { resetPasswordExpires: { lt: now } },
        data: { resetPasswordToken: null, resetPasswordExpires: null },
    });
    console.log(`Nettoyé ${result.count} utilisateurs`);
    process.exit(0);
};

cleanup();
