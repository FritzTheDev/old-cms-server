import 'dotenv/config';
import { Server } from './app';
import { UserController } from './user/user-controller';

new Server([new UserController()]).listen();
