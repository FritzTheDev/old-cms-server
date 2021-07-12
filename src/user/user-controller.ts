/**
 * Filename: user-controller.ts
 * Last Editor: Frederick Johnson (FritzTheDev)
 * Last Edited: 7/12/21
 * Description: Handles routing & controller logic for users.
 */

import { NextFunction, Request, Response, Router } from 'express';
import { UserService } from './user-service';
import { Controller } from '../interfaces/controller-interface';

/** Handles Routing + local middleware & directs requests to the appropriate UserService method */
export class UserController implements Controller {
  /** The path the App class uses for routing */
  public path = '/user';

  /** Express router object to fill with route-handler pairs  */
  public router = Router();

  /** Service that handles database queries & business logic */
  private userService = new UserService();

  constructor() {
    this.configureRoutes();
  }

  private configureRoutes() {
    this.router.get('/', this.handleGetAllUsers);
  }

  private handleGetAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const allUsers = await this.userService.getAllUsers();
      res.status(200).json(allUsers);
    } catch (error) {
      next(error);
    }
  };
}
