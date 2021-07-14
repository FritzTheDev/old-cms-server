import { HttpException } from './http-exception';

export class InvalidCredentialException extends HttpException {
  public status: number;

  public message: string;

  constructor() {
    super(400, `Invalid Credentials: Try again or make sure you're registered`);
  }
}
