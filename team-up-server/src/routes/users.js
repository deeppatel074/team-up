import { Router } from "express";
import * as UserController from "../controllers/users";
const routes = Router();

routes.get("/", UserController.test);

export default routes;
