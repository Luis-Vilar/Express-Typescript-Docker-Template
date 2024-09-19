import { Router } from "express";
import { jwt_middleware } from "../services/jwt.services";
import { rbacMiddleware } from "../services/rbac.services";
import { authRouter } from "./v1/auth.routes";
import homeRouter from "./v1/home";
import { notFoundRoute } from "./v1/notFound.routes";
import { userPublicRouter, userReadRoutes } from "./v1/users.routes";

const privateRoutes = Router();
privateRoutes.use(jwt_middleware);

const readRoutes = Router();
const createRoutes = Router();
const deleteRoutes = Router();
const updateRoutes = Router();

readRoutes.use(rbacMiddleware(["READ"]));
createRoutes.use(rbacMiddleware(["CREATE"]));
deleteRoutes.use(rbacMiddleware(["DELETE"]));
updateRoutes.use(rbacMiddleware(["UPDATE"]));

readRoutes.use(userReadRoutes);

privateRoutes.use(readRoutes); // Todo! : add createRoutes, deleteRoutes  here...

//PUBLIC ROUTES
const publicRoutes = Router();
publicRoutes.use(homeRouter, userPublicRouter, authRouter);

export default [publicRoutes, privateRoutes, notFoundRoute];
