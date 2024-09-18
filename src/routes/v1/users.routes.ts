import { Router } from "express";
import { getAllUsers, createNewUser } from "../../controllers/user.controllers";
import { UserCreateDTO } from "../../dtos/user.dto";
import { validationMiddleware } from "../../services/classValidator.service";

const userPublicRouter = Router();
const userReadRoutes = Router();

//PRIVATE ROUTES
userReadRoutes.get("/users", getAllUsers);

//PUBLICS ROUTES
userPublicRouter.post("/users", validationMiddleware(UserCreateDTO) ,createNewUser);

export { userPublicRouter, userReadRoutes  };
