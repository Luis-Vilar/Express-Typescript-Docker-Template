import { Response } from 'express';

class ApiError extends Error {
  statusCode: number;
  errors: string[];
  constructor(message: string, statusCode: number, errors: string[]) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string, errors: string[]) {
    super(message, 400, errors);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string, errors: string[]) {
    super(message, 401, errors);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string, errors: string[]) {
    super(message, 403, errors);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string, errors: string[]) {
    super(message, 404, errors);
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string, errors: string[]) {
    super(message, 500, errors);
  }
}

export function errorHandler(err: Error, res: Response) {
  
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message, errors: err.errors, statusCode: err.statusCode });
  }
  if(err.message.includes("Unique constraint failed on the fields: (`email`)")){
    return res.status(400).json({ message: "This email isn`t available", errors: ["email is in use"], statusCode: 400 });

  }
  return res.status(500).json({ message: err.message, errors: ["Internal server error"], statusCode: 500 });
}