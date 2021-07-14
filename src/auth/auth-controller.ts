import { NextFunction, Request, Response, Router } from 'express';
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
    this.router.post('/login', validationMiddleware(LoginDTO), this.handleLogin);
  }

  /** Handles log in & token creation logic given an email and password */
  private handleLogin = async (
    req: Request<Record<string, never>, Record<string, never>, LoginDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { user, token } = await this.authService.login(req.body);
      res.status(201).json({ user, token });
    } catch (error) {
      next(error);
    }
  };
}
