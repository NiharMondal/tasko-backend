import { Router } from "express";
import { routeArray } from "./routeArray";

const rootRouter = Router();

routeArray.forEach((route) => rootRouter.use(route.path, route.router));

export default rootRouter;
