import { User } from '@prisma/client';
import { prisma } from '../database/prisma';

/** Handles database queries & business logic - these instance methods get called from controllers. */
export class UserService {
  /** prisma instance that gives us access to a typed postgres db. Neat! */
  private db = prisma;

  /** Returns a promise with an array of every user in the database */
  async getAllUsers(): Promise<User[]> {
    const users = await this.db.user.findMany();
    return users.map((user) => ({ ...user, password: undefined }));
  }

  /** Returns a promise with an array of a single user that matches the given ID */
  async getOneUser(id: number): Promise<User> {
    const user = await this.db.user.findUnique({ where: { id } });
    return { ...user, password: undefined };
  }
}
