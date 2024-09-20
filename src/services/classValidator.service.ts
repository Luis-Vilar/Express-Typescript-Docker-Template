import { Request, Response, NextFunction } from "express";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { BadRequestError, errorHandler } from "./error.services";

class RequestValidator {
  static validate = <T>(classInstance: ClassConstructor<T>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const convertedObject = plainToInstance(classInstance, req.body);
      const errors = await validate(convertedObject as object);

      if (errors.length > 0) {
        const constraintsMessages = errors.map((error) =>
          Object.values(error.constraints).join(",")
        );

        errorHandler(
          new BadRequestError(
            "Request validation failed!",
            constraintsMessages
          ),
          res
        );
      } else {
        next();
      }
    };
  };
}

export function validationMiddleware<T>(classInstance: ClassConstructor<T>) {
  return RequestValidator.validate(classInstance);
}
