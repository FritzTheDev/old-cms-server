/**
 * Filename: database/prisma.ts
 * Last Editor: Frederick Johnson (FritzTheDev)
 * Last Edited: 7/12/21
 * Description: Exports a prisma object instance that allows me to run db queries.
 */
import { PrismaClient } from '@prisma/client';

/** Prisma client instance - gives me access to everything I'll need from my DB. */
export const prisma = new PrismaClient();
