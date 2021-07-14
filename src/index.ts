import 'dotenv/config';
import { Server } from './app';
import { AuthController } from './auth/auth-controller';
import { UserController } from './user/user-controller';

new Server([new UserController(), new AuthController()]).listen();
