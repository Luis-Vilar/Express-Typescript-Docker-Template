import { Router } from "express";
import { getAllUsers, createNewUser } from "../../controllers/user.controllers";

const userPublicRouter = Router();
const userPrivateRouter = Router();


//PRIVATE ROUTES
userPrivateRouter.use((req, res, next) => {
  console.log("Private route accessed by" + req.ip);
  //todo: implement jwt middleware and RBAC
  next();
});
userPrivateRouter.get("/users", getAllUsers);


//PUBLICS ROUTES
userPublicRouter.post("/users", (req, res) => {
  createNewUser(req, res);
});

export default [userPublicRouter, userPrivateRouter];
