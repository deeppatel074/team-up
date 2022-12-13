import { Router } from "express";
const routes = Router();
import * as WorkspaceController from "../controllers/workspace";
import { verify } from "../services/auth";
import { validateWorkSpaceName } from "../services/validation";
// import upload from "../config/multer";


routes.post("/workspace", verify, validateWorkSpaceName, WorkspaceController.createWorkspace);

routes.get("/workspaces", verify, WorkspaceController.getWorkspaceById);





export default routes;
