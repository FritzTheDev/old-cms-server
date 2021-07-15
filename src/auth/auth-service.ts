import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { User, Prisma } from '@prisma/client';

import { LoginDTO } from './login-dto';
import { prisma } from '../database/prisma';
import { RegisterDTO } from './register-dto';
import { HttpException } from '../exceptions/http-exception';
import { InvalidCredentialException } from '../exceptions/invalid-credential-exception';

export class AuthService {
  private db = prisma;

  public async login({ email, password }: LoginDTO): Promise<{ user: User; token: string }> {
    const user = await this.db.user.findUnique({ where: { email }, rejectOnNotFound: true });
    const validPassword = await compare(password, user.password);
    if (!validPassword) throw new InvalidCredentialException();
    const token = sign({ id: user.id }, process.env.JWT_SECRET);
    return { token, user: { ...user, password: undefined } };
  }

  /** Creates a user & returns a promise with that user */
  async createUser(data: RegisterDTO): Promise<{ user: User; token: string }> {
    let createdUser;
    let token;
    try {
      const password = await hash(data.password, 10);
      const hashedData: RegisterDTO = { ...data, password };
      createdUser = await this.db.user.create({ data: hashedData });
      token = sign({ id: createdUser.id }, process.env.JWT_SECRET);
      return { token, user: { ...createdUser, password: undefined } };
    } catch (error) {
      throw error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002' // "Unique Constraint Violated" Error Code
        ? new HttpException(400, 'Error: This email is already taken.')
        : new HttpException();
    }
  }
}
