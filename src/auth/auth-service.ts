import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { User } from '@prisma/client';

import { prisma } from '../database/prisma';
import { LoginDTO } from './login-dto';
import { InvalidCredentialException } from '../exceptions/invalid-credential-exception';

export class AuthService {
  private db = prisma;

  public async login({ email, password }: LoginDTO): Promise<{ user: User; token: string }> {
    const user = await this.db.user.findUnique({ where: { email }, rejectOnNotFound: true });
    const validPassword = await compare(password, user.password);
    if (!validPassword) throw new InvalidCredentialException();
    const token = sign({ id: user.id }, process.env.JWT_SECRET);
    return { token, user };
  }
}
