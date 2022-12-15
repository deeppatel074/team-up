import { Router } from "express";
const routes = Router();
import * as WorkspaceController from "../controllers/workspace";
import { verify } from "../services/auth";
import {
  validateWorkSpaceName,
  validateTaskBody,
} from "../services/validation";
// import upload from "../config/multer";

routes.post(
  "/",
  verify,
  validateWorkSpaceName,
  WorkspaceController.createWorkspace
);
routes.post(
  "/create/task/:id/:userId",
  verify,
  validateTaskBody,
  WorkspaceController.createTask
);

routes.post("/:id/invite", verify, WorkspaceController.sendInvite);

routes.get("/invite/:userId/:token", WorkspaceController.verifyInvite);

routes.get("/:id", verify, WorkspaceController.getWorkspaceById);

routes.delete("/:id", verify, WorkspaceController.deleteWorkspace);

export default routes;
