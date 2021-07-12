/**
 * Filename: index.ts
 * Last Editor: Frederick Johnson (FritzTheDev)
 * Last Edited: 7/12/21
 * Description: Entry point for the app that creates a database connection & starts the express server listening.
 */

import 'dotenv/config';
import { Server } from './app';
import { UserController } from './user/user-controller';

new Server([new UserController()]).listen();
