import { RequestHandler } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { HttpException } from '../exceptions/http-exception';
import { DTO } from '../interfaces/dto-interface';

/** Validates request bodies to ensure validity */
export const validationMiddleware = (dto: ClassConstructor<DTO>, skipMissingProperties = false): RequestHandler =>
  async function validateRequest(req, _res, next) {
    const constructedObject = plainToClass(dto, req.body);
    const errors = await validate(constructedObject, { skipMissingProperties });
    if (errors.length > 0) {
      const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
      next(new HttpException(400, message));
    }
    next();
  };
