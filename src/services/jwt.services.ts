import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { DecodedToken, RequestWithUser } from "../types";

export function generateToken(payload: any) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

export function verifyToken(token: string) {
  const decoded  : DecodedToken = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
}

export function decodeToken(token: string)  {
  return jwt.decode(token);
}

export function getTokenFromHeader(req: Request) {
  return req.headers.authorization.split(" ")[1];
}

export const jwt_middleware = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  var token;
  try {
    token = getTokenFromHeader(req);
  } catch (error) {
    return res.status(401).json({
      message: "Not token provided",
      statusCode: 401,
    });
  }

  try {
    req.user  = verifyToken(token) ;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
      statusCode: 401,
    });
  }
};
