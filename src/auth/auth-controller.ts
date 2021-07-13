/**
 * Filename: user/user-controller.ts
 * Last Editor: Frederick Johnson (FritzTheDev)
 * Last Edited: 7/13/21
 * Description: Handles routing & controller logic for auth.
 */
import { Router } from 'express';
import { AuthService } from './auth-service';
import { Controller } from '../interfaces/controller-interface';

export class AuthController implements Controller {
  public path = '/auth';

  public router = Router();

  private authService = new AuthService();
}
