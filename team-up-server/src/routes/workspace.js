import { Router } from "express";
const routes = Router();
import * as WorkspaceController from "../controllers/workspace";
import { verify } from "../services/auth";
import { validateWorkSpaceName } from "../services/validation";
// import upload from "../config/multer";

routes.post(
  "/",
  verify,
  validateWorkSpaceName,
  WorkspaceController.createWorkspace
);

routes.post("/:id/invite", verify, WorkspaceController.sendInvite);

routes.get("/invite/:userId/:token", WorkspaceController.verifyInvite);

export default routes;
