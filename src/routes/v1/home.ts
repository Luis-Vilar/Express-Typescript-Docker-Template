import { Router, Request, Response } from "express";

const homeRouter = Router();

homeRouter.get("/", (req: Request, res: Response) => {
  console.log(`${req.ip}  : ${req.url} ${req.method} ${new Date().toLocaleDateString('es-ES')} ${new Date().toLocaleTimeString('es-ES')}`);
  return res
  .status(200)
  .send("Hello World!");
});

export default homeRouter;
