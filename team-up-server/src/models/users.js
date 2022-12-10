import { auth } from 'firebase-admin';

const mongoCollections = require('../mongoDB/mongoCollections');
const users = mongoCollections.users;


export default {
    async signinData(uid, authToken, email) {
        const userCollection = await users();
        let newUser = {
            _id: uid,
            authToken: authToken,
            email:email
    };

    const newInsertInformation = await userCollection.insertOne(newUser);
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
    // return await this.getUserById(newInsertInformation.insertedId.toString());
        return ({
        data_inserted: true
    })
    },

    async updateAuthToken(authToken,uid) {
        const userCollection = await users();
        const user = await userCollection.findOne({ _id: uid });
        if (!user) {
            throw `User not found`
        }
        const updateInfo = await userCollection.updateOne({ _id: uid }, {
            $set: { authToken: authToken }

        })
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
            throw 'Update failed';
        return ({
            updated: true
        })
    }
}

