import homeRouter from "./v1/home";
import userPublicRouter from "./v1/users.routes";

export default [homeRouter, ...userPublicRouter];