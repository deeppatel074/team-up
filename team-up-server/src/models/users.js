import mongoCollections from "../config/mongoCollections";
const users = mongoCollections.users;

export async function signinData(authToken, email) {
  const userCollection = await users();
  let newUser = {
    authToken: authToken,
    email: email,
  };

  const newInsertInformation = await userCollection.insertOne(newUser);
  if (newInsertInformation.insertedCount === 0) throw "Insert failed!";
  return {
    data_inserted: true,
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
  return {
    updated: true,
  };
}
