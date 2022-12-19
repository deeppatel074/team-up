import * as workSpaceModels from "../models/workspace";
import * as UserModels from "../models/users";
import { sendMail } from "../services/mailer";
import { ObjectId } from "mongodb";
import constants from "../config/constants";

export async function createWorkspace(req, res) {
  try {
    let insertedWorkspace = await workSpaceModels.createWorkspaceModel(
      req.body.name,
      res.locals._id
    );
    return res.success(insertedWorkspace);
  } catch (e) {
    return res.error(500, e);
  }
}

export async function sendInvite(req, res) {
  try {
    let email = req.body.email;
    let workspaceId = req.params.id;
    let userId,
      userName = "There";
    let isUser = await UserModels.findByEmail(email);
    if (!isUser) {
      //create
      let createdInviteUser = await UserModels.createInviteUser(email);
      userId = createdInviteUser._id;
    } else {
      userId = isUser._id;
      userName = isUser.firstName + " " + isUser.lastName;
    }
    try {
      // find in workspace if find send send token again else create

      let workspace = await workSpaceModels.getWorkspaceById(workspaceId);
      if (!workspace) {
        throw "workspace not found by this id";
      }
      const found = workspace.members.find(
        (element) => element.id.toString() === userId.toString()
      );
      let addToWorkspace;
      if (!found) {
        addToWorkspace = await workSpaceModels.inviteToWorkspace(
          workspaceId,
          userId
        );
      } else {
        if (found.tempToken === null) {
          return res.error(400, "User Already Present In Workspace");
        }
        addToWorkspace = {
          workspaceName: workspace.name,
          memberToAdd: found,
        };
      }

      //send email Here
      sendMail(
        "invite",
        email,
        `${res.locals.firstName} ${res.locals.lastName} invited to workspace ${addToWorkspace.workspaceName}`,
        {
          name: `${res.locals.firstName} ${res.locals.lastName}`,
          userName: userName,
          workspaceName: addToWorkspace.workspaceName,
          url: `${process.env.INVITE_BASE_URL}/workspace/invite/${userId}/${addToWorkspace.memberToAdd.tempToken}`,
        }
      );
      return res.success({
        send: true,
      });
    } catch (e) {
      return res.error(400, e);
    }
  } catch (e) {
    return res.error(500, e);
  }
}

export async function verifyInvite(req, res) {
  try {
    let userId = req.params.userId;
    let token = req.params.token;
    try {
      let verified = await workSpaceModels.verifyInvite(userId, token);
      return res.success(verified);
    } catch (e) {
      return res.error(400, e);
    }
  } catch (e) {
    return res.error(500, e);
  }
}
export async function deleteWorkspace(req, res) {
  try {
    let id = req.params.id;
    let workspace = await workSpaceModels.getWorkspaceById(id);
    if (!workspace) {
      throw "workspace not found by this id";
    }
    if (workspace.createdBy.toString() !== res.locals._id.toString()) {
      return res.unauthorizedUser();
    }
    let deleted = await workSpaceModels.deleteWorkspaceById(id);
    return res.success(deleted);
  } catch (e) {
    return res.error(500, e);
  }
}

export async function getWorkspaceById(req, res) {
  try {
    let id = req.params.id;
    let workspace = await workSpaceModels.getWorkspaceById(id);
    if (!workspace) {
      throw "workspace not found by this id";
    }
    const found = workspace.members.find(
      (element) => element.id.toString() === res.locals._id.toString()
    );
    if (!found) {
      return res.unauthorizedUser();
    }
    return res.success(workspace);
  } catch (e) {
    return res.error(500, e);
  }
}

export async function createTask(req, res) {
  try {
    let id = req.params.id;
    let userId = res.locals._id.toString();
    let workspace = await workSpaceModels.getWorkspaceById(id);
    if (!workspace) {
      throw "workspace not found by this id";
    }
    const found = workspace.members.find(
      (element) => element.id.toString() === userId.toString()
    );
    if (!found) {
      return res.unauthorizedUser();
    }
    let body = req.body;
    let taskToInsert = {
      _id: new ObjectId(),
      title: body.title,
      description: body.description,
      startDate: body.startDate,
      endDate: body.endDate,
      status: constants.status.task.INCOMPLETE,
      createdBy: ObjectId(userId),
      createdDate: new Date(),
      completedBy: undefined,
    };
    let createdTask = await workSpaceModels.createTask(id, taskToInsert);
    return res.success(createdTask);
  } catch (e) {
    return res.error(500, e);
  }
}

export async function changeWorkSpaceName(req, res) {
  try {
    let id = req.params.id;
    let name = req.body.name;
    let workspace = await workSpaceModels.getWorkspaceById(id);
    try {
      if (!workspace) {
        throw "workspace not found by this id";
      }
      if (workspace.createdBy.toString() !== res.locals._id.toString()) {
        return res.unauthorizedUser();
      }
      let isUpdated = await workSpaceModels.updateWorkspaceName(id, name);
      return res.success(isUpdated);
    } catch (e) {
      return res, error(400, e);
    }
  } catch (e) {
    return res.error(500, e);
  }
}

export async function updateTask(req, res) {
  try {
    let id = req.params.id;
    let userId = res.locals._id.toString();
    let taskId = req.params.taskId;
    let workspace = await workSpaceModels.getWorkspaceById(id);
    if (!workspace) {
      return res.error(400, "workspace not found by this id");
    }
    const found = workspace.members.find(
      (element) => element.id.toString() === userId.toString()
    );
    if (!found) {
      return res.unauthorizedUser();
    }
    const getTask = workspace.tasks.find(
      (element) => element._id.toString() === taskId.toString()
    );
    if (!getTask) {
      return res.error(400, "Task not found by this id");
    }
    let body = req.body;
    let taskToUpdate = {
      _id: ObjectId(taskId),
      title: body.title,
      description: body.description,
      startDate: body.startDate,
      endDate: body.endDate,
      status: getTask.status,
      createdBy: getTask.createdBy,
      createdDate: getTask.createdDate,
      completedBy: getTask.completedBy,
    };
    let createdTask = await workSpaceModels.updateTask(
      id,
      taskId,
      taskToUpdate
    );
    return res.success(createdTask);
  } catch (e) {
    return res.error(500, e);
  }
}

export async function getALLTask(req, res) {
  try {
    let id = req.params.id;
    let userId = res.locals._id.toString();
    let workspace = await workSpaceModels.getWorkspaceById(id);
    if (!workspace) {
      return res.error(400, "workspace not found by this id");
    }
    const found = workspace.members.find(
      (element) => element.id.toString() === userId.toString()
    );
    if (!found) {
      return res.unauthorizedUser();
    }

    let tasks = await workSpaceModels.getTask(id, userId);
    return res.success(tasks);
  } catch (e) {
    return res.error(500, e);
  }
}

export async function getTaskById(req, res) {
  try {
    let id = req.params.id;
    let taskId = req.params.taskId;
    let workspace = await workSpaceModels.getWorkspaceById(id);
    const task = workspace.tasks.find(
      (element) => element._id.toString() === taskId.toString()
    );
    if (!task) {
      return res.error(404, "Task Not found");
    }

    return res.success(task);
  } catch (e) {
    return res.error(500, e);
  }
}

export async function markTask(req, res) {
  try {
    let isCompleted = req.body.isCompleted;
    let id = req.params.id;
    let taskId = req.params.taskId;
    let status = constants.status.task.INCOMPLETE;
    if (isCompleted) {
      status = constants.status.task.COMPLETED;
    }
    let updated = await workSpaceModels.markTask(id, taskId, status);
    return res.success(updated);
  } catch (e) {
    return res.error(500, e);
  }
}

export async function deleteTask(req, res) {
  try {
    let id = req.params.id;
    let taskId = req.params.taskId;
    let deleted = await workSpaceModels.deleteTask(id, taskId);
    return res.success(updated);
  } catch (e) {
    return res.error(500, e);
  }
}

export async function getTeam(req, res) {
  try {
    let id = req.params.id;
    let userId = res.locals._id.toString();
    let workspace = await workSpaceModels.getWorkspaceById(id);
    if (!workspace) {
      return res.error(400, "workspace not found by this id");
    }
    const found = workspace.members.find(
      (element) => element.id.toString() === userId.toString()
    );
    if (!found) {
      return res.unauthorizedUser();
    }
    let getTeam = await workSpaceModels.getTeam(id);
    return res.success(getTeam);
  } catch (e) {
    return res.error(500, e);
  }
}
