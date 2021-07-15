import cors from 'cors';
import rateLimit from 'express-rate-limit';
import Express, { Application, json } from 'express';
import passport from 'passport';
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

  /** Starts the app listening for requests on the port set by the PORT environment variable or 4200 if that's undefined. */
  public listen(): void {
    this.app.listen(process.env.PORT || 4200);
    // eslint-disable-next-line no-console
    console.info(`Listening on ${process.env.PORT || 4200}`);
  }

  /** Configures the global middleware that needs to be applied to every incoming request
   * Includes:
   * - Cross Origin Request Sharing via `cors`
   * - JSON body parsing (bundled with Express but the API matches `body-parser`'s JSON method )
   * - Rate Limiting via express-rate-limit
   */
  private configureGlobalMiddleware(): void {
    // This checks if the app is running in prod. If it is, it requires the client's origin to be set.
    this.app.use("*", cors({ origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_ORIGIN : '*' }));
    // Passport
    this.app.use(passport.initialize());
    // Enabled for ELB / Heroku Reverse Proxy support with rate limit
    this.app.set('trust proxy', 1);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this.app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
    this.app.use(json());
  }

  /** Configures the express app to use controllers that handle incoming requests. */
  private configureControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.router);
    });
  }

  /** Adds error handling middleware on a global basis. */
  private configureErrorHandling(): void {
    this.app.use(errorHandlingMiddleware);
  }
}
