import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/http-exception';

/** 
 * Catches errors both known & unknown in request handlers.
 *
 * If the error is something we planned for / expect, it'll send an appropriate message & status code.
 *
 * Unexpected errors will send a generic message & status code 500. 
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandlingMiddleware = (error: HttpException, _request: Request, response: Response, _next: NextFunction): void => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response.status(status).send({
    message,
    status,
  });
};
