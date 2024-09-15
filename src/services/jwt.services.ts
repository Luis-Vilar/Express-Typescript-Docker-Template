import { NextFunction } from "express";
import jwt from "jsonwebtoken";

export function generateToken(payload: any) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

export function decodeToken(token: string) {
  return jwt.decode(token);
}

export function getTokenFromHeader(req: any) {
  return req.headers.authorization.split(" ")[1];
}

export const jwt_middleware = (req: any, res: any, next: NextFunction) => {
  var token;
  try {
    token = getTokenFromHeader(req);
  } catch (error) {
    return res.status(401).json({
      message: "Not token provided",
    });
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
