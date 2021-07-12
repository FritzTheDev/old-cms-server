/**
 * Filename: app.ts
 * Last Editor: Frederick Johnson (FritzTheDev)
 * Last Edited: 7/12/21
 * Description: app.ts is where every part of the app (except database config) gets tied together & ready to start listening.
 */
import cors from 'cors';
import Express, { Application, json } from 'express';
import { Controller } from './interfaces/controller-interface';
import { errorHandlingMiddleware } from './middleware/error-handling-middleware';

/** Wraps the express application, middleware, controllers, and error handling into one object.  */
export class Server {
  private app: Application = Express();

  constructor(controllers: Controller[]) {
    this.configureGlobalMiddleware();
    this.configureControllers(controllers);
    this.configureErrorHandling();
  }

  /** starts the app listening for requests on the port set by the PORT environment variable or 3000 if that's undefined. */
  public listen(): void {
    this.app.listen(process.env.PORT || 4200);

    // eslint-disable-next-line no-console
    console.info(`Listening on ${process.env.PORT || 4200}`);
  }

  /** Configures the global middleware that needs to be applied to every incoming request
   * Includes:
   * - Cross Origin Request Sharing via `cors`
   * - JSON body parsing (bundled with Express but the API matches `body-parser`'s JSON method )
   *
   */
  private configureGlobalMiddleware() {
    // This checks if the app is running in prod. If it is, it requires the client's origin to be set.
    this.app.use(cors({ origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_ORIGIN : '*' }));
    this.app.use(json());
  }

  /** Configures the express app to use controllers that handle incoming requests. */
  private configureControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.router);
    });
  }

  /** Adds error handling middleware on a global basis. */
  private configureErrorHandling() {
    this.app.use(errorHandlingMiddleware);
  }
}
