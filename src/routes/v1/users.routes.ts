import { Router } from "express";
import { getAllUsers, createNewUser } from "../../controllers/user.controllers";

const userPublicRouter = Router();
const userPrivateRouter = Router();

//PRIVATE ROUTES
userPrivateRouter.get("/users", getAllUsers);

//PUBLICS ROUTES
userPublicRouter.post("/users", createNewUser);

export { userPublicRouter, userPrivateRouter };
