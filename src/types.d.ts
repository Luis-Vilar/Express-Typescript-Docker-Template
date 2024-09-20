import { Request } from "express";

type RequestWithUser = Request & {
  user: { sub: string; roleId: number; name: string; iat: number; exp: number };
};
