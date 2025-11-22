import { PrismaClient } from '@prisma/client';

// Singleton Prisma Client
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // Evita múltiplas instâncias em desenvolvimento (hot reload)
  const globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };

  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient({
      log: ['query', 'error', 'warn'],
    });
  }
  prisma = globalWithPrisma.prisma;
}

export { prisma };

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
