import { Router } from "express";
const routes = Router();
import * as UserController from "../controllers/users";
import { verify } from "../services/auth";

routes.post("/signup", UserController.signUp);

routes.post("/login", UserController.login);

export default routes;
