import mongoCollections from "../config/mongoCollections";
import constants from "../config/constants";
import { v4 as uuidv4 } from "uuid";
const users = mongoCollections.users;

export async function signinData(authToken, email) {
  const userCollection = await users();
  let newUser = {
    authToken: authToken,
    email: email,
    firstName: undefined,
    lastName: undefined,
    profileUrl: undefined,
    createdDate: new Date(),
    status: constants.status.user.INACTIVE,
  };

  const newInsertInformation = await userCollection.insertOne(newUser);
  if (newInsertInformation.insertedCount === 0) throw "Insert failed!";
  return {
    id: newInsertInformation.insertedId.toString(),
  };
}

export async function updateAuthToken(authToken, email) {
  const userCollection = await users();
  const user = await userCollection.findOne({ email: email });
  if (!user) {
    throw `User not found`;
  }
  const updateInfo = await userCollection.updateOne(
    { _id: user._id },
    {
      $set: { authToken: authToken },
    }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw "Update failed";
  return user._id;
}

export async function findByEmail(email) {
  const userCollection = await users();
  const user = await userCollection.findOne({ email: email });
  // if (!user) {
  //   throw `User not found`;
  // }
  return user;
}

export async function completeProfile(_id, firstName, lastName, profileUrl) {
  const userCollection = await users();
  const updateInfo = await userCollection.updateOne(
    { _id },
    {
      $set: {
        firstName,
        lastName,
        profileUrl,
        status: constants.status.user.ACTIVE,
      },
    }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw "Update failed";
  return {
    updated: true,
  };
}
export async function createInviteUser(email) {
  const userCollection = await users();
  let newUser = {
    email: email,
    authToken: undefined,
    firstName: undefined,
    lastName: undefined,
    profileUrl: undefined,
    createdDate: new Date(),
    status: constants.status.user.INACTIVE,
  };

  const newInsertInformation = await userCollection.insertOne(newUser);
  if (newInsertInformation.insertedCount === 0) throw "Insert failed!";
  return await findByEmail(email);
}
