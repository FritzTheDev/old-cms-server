import { PrismaClient } from '@prisma/client';

/** Prisma client instance - gives me access to everything I'll need from my DB. */
export const prisma = new PrismaClient();
