import { NextFunction, Request, Response, Router } from 'express';
import { CreateUserDTO } from './create-user-dto';
import { validationMiddleware } from '../middleware/validation-middleware';
import { UserService } from './user-service';
import { Controller } from '../interfaces/controller-interface';
import { ResourceNotFoundException } from '../exceptions/resource-not-found-exception';

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

  /** Configures the actual routes & middleware associated with the controller. */
  private configureRoutes() {
    this.router.get('/', this.handleGetAllUsers);
    this.router.post('/', validationMiddleware(CreateUserDTO), this.handleCreateUser);
    this.router.get('/:id', this.handleGetOneUser);
  }

  /** handles "GET all users" requests */
  private handleGetAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const allUsers = await this.userService.getAllUsers();
      res.status(200).json(allUsers);
    } catch (error) {
      next(error);
    }
  };

  /** handles "GET one user" requests */
  private handleGetOneUser = async (
    req: Request<{ id: string }, Record<string, never>, Record<string, never>>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const foundUser = await this.userService.getOneUser(Number(req.params.id));
      if (!foundUser) throw new ResourceNotFoundException('user', req.params.id);
      res.status(200).json(foundUser);
    } catch (error) {
      next(error);
    }
  };

  /** handles "GET all users" requests */
  private handleCreateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createdUser = await this.userService.createUser(req.body);
      res.status(200).json(createdUser);
    } catch (error) {
      next(error);
    }
  };
}
