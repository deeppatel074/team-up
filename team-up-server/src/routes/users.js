import { Router } from "express";
const routes = Router();
import * as UserController from "../controllers/users";
import { verify } from "../services/auth";

routes.post("/signup", UserController.signUp);

routes.post("/login", UserController.login);

routes.post("/logout", verify, UserController.logout);

export default routes;
