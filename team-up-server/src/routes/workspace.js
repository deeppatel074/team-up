import { Router } from "express";
const routes = Router();
import * as WorkspaceController from "../controllers/workspace";
import { verify } from "../services/auth";
import {
  validateWorkSpaceName,
  validateTaskBody,
  validateMeetingBody,
} from "../services/validation";
import upload from "../config/multer";

routes.post(
  "/",
  verify,
  validateWorkSpaceName,
  WorkspaceController.createWorkspace
);
routes.post(
  "/task/:id",
  verify,
  validateTaskBody,
  WorkspaceController.createTask
);

//Update Task
routes.put(
  "/task/:id/:taskId",
  verify,
  validateTaskBody,
  WorkspaceController.updateTask
);

//get task byid
routes.get("/task/:id/:taskId", verify, WorkspaceController.getTaskById);

// Mark Task as Complete
routes.patch("/task/:id/:taskId", verify, WorkspaceController.markTask);

// Delete Task
routes.delete("/task/:id/:taskId", verify, WorkspaceController.deleteTask);

//Get all Members
routes.get("/:id/members", verify, WorkspaceController.getTeam);

routes.post("/:id/invite", verify, WorkspaceController.sendInvite);

routes.post(
  "/:id/files",
  upload.single("file"),
  verify,
  WorkspaceController.uploadFile
);
routes.get("/:id/files", verify, WorkspaceController.getFiles);

routes.post(
  "/:id/meetings",
  verify,
  validateMeetingBody,
  WorkspaceController.sendMeetingLink
);

routes.get("/invite/:userId/:token", WorkspaceController.verifyInvite);

routes.get("/:id/tasks", verify, WorkspaceController.getALLTask);

routes.get("/:id", verify, WorkspaceController.getWorkspaceById);

export default routes;
