import * as workSpaceModels from "../models/workspace";
// import 


export async function createWorkspace(req, res) {
    try {
        let insertedWorkspace = await workSpaceModels.createWorkspaceModel(req.body.name, res.locals._id);
        return res.success(insertedWorkspace);
    }catch (e) {
    return res.error(500, e);
  }
}

export async function getWorkspaceById(req, res) {
  try {
    let workspaces = await workSpaceModels.getWorkspaceById(res.locals._id);
    return res.success(workspaces)
  } catch (e) {
    return res.error(500, e);
  }
}