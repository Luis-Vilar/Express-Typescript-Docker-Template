import homeRouter from "./v1/home";
import userRouter from "./v1/users.routes";

export default [homeRouter, ...userRouter];