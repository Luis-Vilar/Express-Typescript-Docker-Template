import { Router } from "express";
import { rbacMiddleware } from "../services/rbac.services";
import homeRouter from "./v1/home";
import { userPrivateRouter, userPublicRouter } from "./v1/users.routes";

const privateRoutes = Router();
privateRoutes.use(rbacMiddleware);
// TODO: JWT Middleware HERE
//PRIVATE ROUTES BEFORE RBAC AND JWT
privateRoutes.use(userPrivateRouter);

//PUBLIC ROUTES
const publicRoutes = Router();
publicRoutes.use(homeRouter);
publicRoutes.use(userPublicRouter);

export default [publicRoutes, privateRoutes];
