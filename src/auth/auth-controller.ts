import { Router } from 'express';
import { AuthService } from './auth-service';
import { Controller } from '../interfaces/controller-interface';

export class AuthController implements Controller {
  public path = '/auth';

  public router = Router();

  private authService = new AuthService();
}
