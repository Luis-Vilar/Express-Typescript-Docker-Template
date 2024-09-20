import { Router } from "express";
import { getAllUsers, createNewUser, updateOneUser, deleteOneUser } from "../../controllers/user.controllers";
import { UserCreateDTO, UserUpdateDTO } from "../../dtos/user.dto";
import { validationMiddleware } from "../../services/classValidator.service";

const userPublicRouter = Router();
const userReadRoutes = Router();
const userUpdateRoutes = Router();
const userDeleteRoutes = Router();

//PRIVATE ROUTES
userReadRoutes.get("/users", getAllUsers);
userUpdateRoutes.put(
  "/user/:userId",
  validationMiddleware(UserUpdateDTO),
  updateOneUser
);
userDeleteRoutes.delete("/user/:userId", deleteOneUser);
//PUBLICS ROUTES
userPublicRouter.post(
  "/users",
  validationMiddleware(UserCreateDTO),
  createNewUser
);

export { userPublicRouter, userReadRoutes , userUpdateRoutes, userDeleteRoutes};
