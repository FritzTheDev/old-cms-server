/**
 * Filename: user/user-service.ts
 * Last Editor: Frederick Johnson (FritzTheDev)
 * Last Edited: 7/12/21
 * Description: Handles database queries & business logic, primarily from the user controller.
 */
import { User } from '@prisma/client';
import { prisma } from '../database/prisma';
import { CreateUserDTO } from './user-dtos';

/** Handles database queries & business logic - these instance methods get called from controllers. */
export class UserService {
  /** prisma instance that gives us access to a typed postgres db. Neat! */
  private db = prisma;

  /** Returns a promise with an array of every user in the database */
  async getAllUsers(): Promise<User[]> {
    return this.db.user.findMany();
  }

  /** Returns a promise with an array of a single user that matches the given ID */
  async getOneUser(id: number): Promise<User> {
    return this.db.user.findUnique({ where: { id } });
  }

  /** Creates a user & returns a promise with that user */
  async createUser(data: CreateUserDTO): Promise<User> {
    return this.db.user.create({ data })
  }
}
