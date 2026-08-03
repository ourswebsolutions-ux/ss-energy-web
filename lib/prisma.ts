import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
<<<<<<< HEAD
  global.prisma ??
=======
  globalForPrisma.prisma ??
>>>>>>> ebfd850 (updated)
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;