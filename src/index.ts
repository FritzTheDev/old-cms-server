import { Server } from './app';

/** Bootstraps the app by connecting to the database & creating a server object that starts listening. */
const main = () => {
  const app = new Server([]);

  app.listen();
};

main();
