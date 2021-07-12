/**
 * Filename: app.ts
 * Last Editor: Frederick Johnson (FritzTheDev)
 * Last Edited: 7/12/21
 * Description: app.ts is where every part of the app (except database config) gets tied together & ready to start listening.
 */

import Express, { Application, json } from 'express';
import { Controller } from './interfaces/controller-interface';
import { errorHandlingMiddleware } from './middleware/error-handling-middleware';

export class Server {
  private app: Application = Express();

  constructor(controllers: Controller[]) {
    this.configureMiddleware();
    this.configureControllers(controllers);
    this.configureErrorHandling();
  }

  public listen(): void {
    this.app.listen(process.env.PORT || 3000);
  }

  private configureMiddleware() {
    this.app.use(json());
  }

  /** Configures the express app to use  */
  private configureControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.router);
    });
  }

  private configureErrorHandling() {
    this.app.use(errorHandlingMiddleware);
  }
}
