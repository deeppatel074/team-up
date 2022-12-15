import { Router } from "express";
const routes = Router();
import * as UserController from "../controllers/users";
import { verify } from "../services/auth";
import { validateProfileBody } from "../services/validation";
import upload from "../config/multer";

routes.post("/signup", UserController.signUp);

routes.post("/login", UserController.login);

routes.post("/logout", verify, UserController.logout);

routes.post(
  "/profile",
  upload.single("profileImg"),
  verify,
  validateProfileBody,
  UserController.completeProfile
);

routes.get("/:id/workspace", verify, UserController.getAllWorkspaceByUserId);
export default routes;
