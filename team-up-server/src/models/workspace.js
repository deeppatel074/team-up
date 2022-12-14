import { ObjectId } from "mongodb";
import mongoCollections from "../config/mongoCollections";
import constants from "../config/constants";
import { v4 as uuidv4 } from "uuid";
const workspace = mongoCollections.workspace;

export async function createWorkspaceModel(name, createdBy) {
  const WorkspaceCollection = await workspace();

  let newWorkspace = {
    name: name,
    tasks: [],
    sharedFiles: [],
    schedules: [],
    members: [
      {
        id: ObjectId(createdBy),
        role: "owner",
        status: constants.status.user.ACTIVE,
      },
    ],
    createdDate: new Date(),
    createdBy: createdBy,
  };

  const newInsertInformation = await WorkspaceCollection.insertOne(
    newWorkspace
  );
  if (newInsertInformation.insertedCount === 0) throw "Insert failed!";
  return newWorkspace;
}

export async function getWorkspaceById(id) {
  // console.log("Here");
  const WorkspaceCollection = await workspace();
  const workspaceFound = await WorkspaceCollection.findOne({
    _id: ObjectId(id),
  });
  // console.log("Here", workspaceFound);
  if (!workspaceFound) {
    throw "No workspace found by this id";
  }
  // console.log("Found");
  return workspaceFound;
}

export async function inviteToWorkspace(id, userId) {
  const WorkspaceCollection = await workspace();
  const workspaceFound = await WorkspaceCollection.findOne({
    _id: ObjectId(id),
  });
  if (!workspaceFound) {
    throw "No workspace found by this id";
  }
  for (let elem of workspaceFound.members) {
    if (elem.id.toString() === userId.toString()) {
      throw "User Already Exist in this workspace";
    }
  }
  let memberToAdd = {
    id: ObjectId(userId),
    role: "member",
    tempToken: uuidv4(),
    status: constants.status.user.INACTIVE,
  };
  const updateInfo = await WorkspaceCollection.updateOne(
    { _id: ObjectId(id) },
    {
      $push: {
        members: memberToAdd,
      },
    }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw "Update failed";
  return { workspaceName: workspaceFound.name, memberToAdd };
}

export async function verifyInvite(userId, token) {
  const WorkspaceCollection = await workspace();
  const workspaceFound = await WorkspaceCollection.findOne({
    "members.tempToken": token,
  });
  if (!workspaceFound) {
    throw "Invalid Token or Token has been expired";
  }
  const updateInfo = await WorkspaceCollection.updateOne(
    { _id: workspaceFound._id, "members.id": ObjectId(userId) },
    {
      $set: {
        "members.$.tempToken": undefined,
        "members.$.status": constants.status.user.ACTIVE,
      },
    }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw "Update failed";
  return { verified: true };
}
