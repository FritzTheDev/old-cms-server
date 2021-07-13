import { User, Prisma } from '@prisma/client';
import { hash } from 'bcrypt';
import { prisma } from '../database/prisma';
import { CreateUserDTO } from './create-user-dto';
import { HttpException } from '../exceptions/http-exception';

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
    let createdUser;
    try {
      const password = await hash(data.password, 10);
      const hashedData: CreateUserDTO = { ...data, password };
      createdUser = await this.db.user.create({ data: hashedData });
    } catch (error) {
      throw error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002' // "Unique Constraint Violated" Error Code
        ? new HttpException(400, 'Error: This email and/or username are already taken.')
        : new HttpException();
    }
    return createdUser;
  }
}
