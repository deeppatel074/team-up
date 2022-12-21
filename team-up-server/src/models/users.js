import mongoCollections from "../config/mongoCollections";
import constants from "../config/constants";
import { v4 as uuidv4 } from "uuid";
const users = mongoCollections.users;
import * as validation from "../services/validation";
import { ObjectId } from "mongodb";

export async function signinData(authToken, email, name) {
  name = await validation.checkString(name, "name");
  email = await validation.validateEmail(email, "email");
  const userCollection = await users();
  let newUser = {
    authToken: authToken,
    email: email,
    name: name,
    createdDate: new Date(),
    status: constants.status.user.ACTIVE,
  };

  const newInsertInformation = await userCollection.insertOne(newUser);
  if (newInsertInformation.insertedCount === 0) throw "Insert failed!";

  return await findByEmail(email);
}

export async function updateAuthToken(authToken, email, name) {
  email = await validation.validateEmail(email, "email");
  const userCollection = await users();
  const user = await userCollection.findOne({ email: email });
  if (!user) {
    throw `User not found`;
  }
  let set = {};
  if (user.status === constants.status.user.ACTIVE) {
    set = { authToken: authToken };
  } else {
    set = {
      authToken: authToken,
      status: constants.status.user.ACTIVE,
      name: name,
    };
  }
  const updateInfo = await userCollection.updateOne(
    { _id: user._id },
    {
      $set: set,
    }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw "Update failed";
  return await findByEmail(email);
}

export async function findByEmail(email) {
  email = await validation.validateEmail(email, "email");
  const userCollection = await users();
  const user = await userCollection.findOne({ email: email });
  // if (!user) {
  //   throw `User not found`;
  // }
  return user;
}

export async function findById(id) {
  id = await validation.id(id.toString());
  const userCollection = await users();
  const user = await userCollection.findOne({ _id: ObjectId(id) });
  // if (!user) {
  //   throw `User not found`;
  // }
  return user;
}

// export async function completeProfile(_id, firstName, lastName, profileUrl) {
//   const userCollection = await users();
//   const updateInfo = await userCollection.updateOne(
//     { _id },
//     {
//       $set: {
//         displayName
//         status: constants.status.user.ACTIVE,
//       },
//     }
//   );
//   if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
//     throw "Update failed";
//   return {
//     updated: true,
//   };
// }
export async function createInviteUser(email) {
  email = await validation.validateEmail(email, "email");
  const userCollection = await users();
  let newUser = {
    email: email,
    authToken: undefined,
    name: undefined,
    createdDate: new Date(),
    status: constants.status.user.INACTIVE,
  };

  const newInsertInformation = await userCollection.insertOne(newUser);
  if (newInsertInformation.insertedCount === 0) throw "Insert failed!";
  return await findByEmail(email);
}
