/**
 * Filename: middleware/validation-middleware.ts
 * Last Editor: Frederick Johnson (FritzTheDev)
 * Last Edited: 7/12/21s
 * Description: Request Body Validation Middleware
 */

import { RequestHandler } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { HttpException } from '../exceptions/http-exception';
import { CreateUserDTO } from '../user/create-user-dto';

/** Not an ideal replacement for a truly generic solution but I've wasted a bunch of time on this. */
type Dto = CreateUserDTO;

/** Validates request bodies to ensure validity */
export const validationMiddleware = (dto: ClassConstructor<Dto>, skipMissingProperties = false): RequestHandler =>
  async function validateRequest(req, _res, next) {
    const constructedObject = plainToClass(dto, req.body);
    const errors = await validate(constructedObject, { skipMissingProperties });
    if (errors.length > 0) {
      const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
      next(new HttpException(400, message));
    }
    next();
  };
