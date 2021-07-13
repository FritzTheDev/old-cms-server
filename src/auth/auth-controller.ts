import { Router } from 'express';
import { LoginDTO } from './login-dto';
import { AuthService } from './auth-service';
import { Controller } from '../interfaces/controller-interface';
import { validationMiddleware } from '../middleware/validation-middleware';

export class AuthController implements Controller {
  public path = '/auth';

  public router = Router();

  private authService = new AuthService();

  constructor() {
    this.configureRoutes();
  }

  private configureRoutes() {
    this.router.post('/login', validationMiddleware(LoginDTO))
  }
}
