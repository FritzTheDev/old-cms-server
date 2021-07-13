/**
 * Filename: user/user-controller.ts
 * Last Editor: Frederick Johnson (FritzTheDev)
 * Last Edited: 7/13/21
 * Description: Handles Auth-related logic & database queries
 */
import { prisma } from '@prisma/client';

export class AuthService {
  private db = prisma;
}
