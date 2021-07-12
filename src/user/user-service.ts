/**
 * Filename: user-service.ts
 * Last Editor: Frederick Johnson (FritzTheDev)
 * Last Edited: 7/12/21
 * Description: Handles database queries & business logic, primarily from the user controller.
 */
import { User } from '@prisma/client';
import { prisma } from '../database/prisma';

export class UserService {
  private db = prisma;

  async getAllUsers(): Promise<User[]> {
    return this.db.user.findMany();
  }
}
