import * as workSpaceModels from "../models/workspace";
import * as UserModels from "../models/users";
import { sendMail } from "../services/mailer";

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
      let addToWorkspace = await workSpaceModels.inviteToWorkspace(
        workspaceId,
        userId
      );
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
