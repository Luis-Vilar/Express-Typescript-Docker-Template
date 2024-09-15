import { Router } from "express";
import { getAllUsers, createNewUser } from "../../controllers/user.controllers";

const userPublicRouter = Router();
const userReadRoutes = Router();

//PRIVATE ROUTES
userReadRoutes.get("/users", getAllUsers);

//PUBLICS ROUTES
userPublicRouter.post("/users", createNewUser);

export { userPublicRouter, userReadRoutes  };
