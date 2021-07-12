/**
 * Filename: index.ts
 * Last Editor: Frederick Johnson (FritzTheDev)
 * Last Edited: 7/12/21
 * Description: Entry point for the app that creates a database connection & starts the express server listening.
 */

import { Server } from './app';

/** Bootstraps the app by connecting to the database & creating a server object, then starts it listening. */
const main = () => {
  const app = new Server([]);
  app.listen();
};

main();
