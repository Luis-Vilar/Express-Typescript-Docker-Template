import { Router } from "express";
import { jwt_middleware } from "../services/jwt.services";
import { rbacMiddleware } from "../services/rbac.services";
import { authRouter } from "./v1/auth.routes";
import homeRouter from "./v1/home";
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

//NOT FOUND ROUTE
const notFoundRoute = Router();
notFoundRoute.use((req, res) => {
  const report = {
    method: req.method,
    url: req.url,
    body: req.body,
    query: req.query,
    params: req.params,
    headers: req.headers,
    ip: req.ip,
  };
  //Todo: send the report to the admin (report)=>{send(report)}
  res.status(404).json({
    error: "Not Found",
    message:
      "The requested route does not exist, a report has been sent to the admin",
    status: 404,
    report,
  });
});

export default [publicRoutes, privateRoutes, notFoundRoute];
