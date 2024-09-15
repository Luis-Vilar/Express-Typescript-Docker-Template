import { Router } from "express";
import { loginUser } from "../../controllers/user.controllers";


const authRouter = Router();

authRouter.post("/login", loginUser);


export { authRouter };