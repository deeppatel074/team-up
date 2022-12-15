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

export async function getAllWorkspaceByUserId(userId) {
  const WorkspaceCollection = await workspace();
  const workspaceFound = await WorkspaceCollection.find({
    $or: [{ createdBy: ObjectId(userId) }, { "members.id": ObjectId(userId) }],
  })
    .sort({ createdDate: -1 })
    .toArray();
  return workspaceFound;
}

export async function deleteWorkspaceById(id) {
  const WorkspaceCollection = await workspace();
  let deleteData = await WorkspaceCollection.deleteOne({
    _id: ObjectId(id),
  });
  if (!deleteData.acknowledged && !deleteData.deleteCount)
    throw "Update failed";
  return {
    deleted: true,
  };
}

export async function createTask(id, task) {
  const WorkspaceCollection = await workspace();
  const updateInfo = await WorkspaceCollection.updateOne(
    { _id: ObjectId(id) },
    {
      $push: {
        tasks: task,
      },
    }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw "Update failed";
  return {
    added: true,
  };
}
