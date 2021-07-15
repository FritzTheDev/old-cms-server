import { NextFunction, Request, Response, Router } from 'express';
import { authenticate } from 'passport';
import { LoginDTO } from './login-dto';
import { AuthService } from './auth-service';
import { Controller } from '../interfaces/controller-interface';
import { validationMiddleware } from '../middleware/validation-middleware';
import { RequestWithUser } from '../interfaces/req-with-user-interface';
import { RegisterDTO } from './register-dto';

export class AuthController implements Controller {
  public path = '/auth';

  public router = Router();

  private authService = new AuthService();

  constructor() {
    this.configureRoutes();
  }

  private configureRoutes() {
    this.router.post('/login', validationMiddleware(LoginDTO), this.handleLogin);
    this.router.post('/register', validationMiddleware(RegisterDTO), this.handleRegister);
    this.router.get('/me', authenticate('jwt', { session: false }), this.handleCheckToken);
  }

  /** Handles log in & token creation logic given an email and password */
  private handleLogin = async (
    req: Request<Record<string, never>, Record<string, never>, LoginDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { user, token } = await this.authService.login(req.body);
      res.status(200).json({ user, token });
    } catch (error) {
      next(error);
    }
  };

  /** handles "GET all users" requests */
  private handleRegister = async (
    req: Request<Record<string, never>, Record<string, never>, RegisterDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const createdUser = await this.authService.createUser(req.body);
      res.status(200).json(createdUser);
    } catch (error) {
      next(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private handleCheckToken = (req: RequestWithUser, res: Response, _next: NextFunction) => {
    req.user.password = undefined;
    res.status(200).json(req.user);
  };
}
