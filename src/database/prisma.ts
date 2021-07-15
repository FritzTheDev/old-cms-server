import { PrismaClient } from '@prisma/client';
import { HttpException } from '../exceptions/http-exception';

/** Prisma client instance - gives me access to everything I'll need from my DB. */
export const prisma = new PrismaClient({
  rejectOnNotFound: {
    findFirst: { User: () => new HttpException(404, 'User Not Found') },
    findUnique: { User: () => new HttpException(404, 'User Not Found') },
  },
});
