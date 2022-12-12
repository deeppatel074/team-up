import admin from "../config/firebase-config";
import RedisClient from "../config/redisClient";
import * as UserModels from "../models/users";
import mongoCollections from "../config/mongoCollections";
const users = mongoCollections.users;

export async function signUp(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    let decodedToken = await admin.auth().verifyIdToken(token);
    if (decodedToken) {
      let uid = decodedToken.uid;
      let email = decodedToken.email;
      const userCollection = await users();
      const exisiting_user = await userCollection.findOne({ email: email });
      if (exisiting_user) {
        const updateToken = await UserModels.updateAuthToken(token, email);
        // update token in redis
        await RedisClient.hSet("users", token, email);
        return res.success({
          updateToken,
        });
      } else {
        try {
          let userData = await admin.auth().getUser(uid);
          let signinDataStore = await UserModels.signinData(
            token,
            userData.email
          );
          //add token in redis
          await RedisClient.hSet("users", token, email);
          return res.success({
            signinDataStore,
          });
        } catch (e) {
          return res.error(500, e);
        }
      }
    }
  } catch (e) {
    return res.error(500, e);
  }
}

export async function login(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    let decodedToken = await admin.auth().verifyIdToken(token);
    if (decodedToken) {
      let uid = decodedToken.uid;
      let email = decodedToken.email;
      const userCollection = await users();
      const exisiting_user = await userCollection.findOne({ email: email });
      if (exisiting_user) {
        const updateToken = await UserModels.updateAuthToken(token, email);
        // update token in redis
        await RedisClient.hSet("users", token, email);
        return res.success({
          updateToken,
        });
      } else {
        try {
          let userData = await admin.auth().getUser(uid);

          let signinDataStore = await UserModels.signinData(
            token,
            userData.email
          );
          //add token in redis
          await RedisClient.hSet("users", token, email);
          return res.success({
            signinDataStore,
          });
        } catch (e) {
          return res.error(500, e);
        }
      }
    }
  } catch (e) {
    return res.error(500, e);
  }
}

export async function logout(req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    await RedisClient.hDel("users", token);
    return res.success({
      logout: true,
    });
  } catch (e) {
    return res.error(500, e);
  }
}
