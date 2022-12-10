import { Router } from "express";
const routes = Router();
import admin from "../../config/firebase-config";
import userModels from "../models/users"
const mongoCollections = require('../mongoDB/mongoCollections');
const users = mongoCollections.users;


routes.
    route("/signup")
    .post(async (req, res) => {
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        try {
            let decodedToken = await admin.auth().verifyIdToken(token);
            if (decodedToken) {
                let uid = decodedToken.uid;
                const userCollection = await users();
                const exisiting_user = await userCollection.findOne({ _id: uid });
                if (exisiting_user) {
                    const updateToken = await userModels.updateAuthToken(token, uid);
                    console.log(updateToken);
                    return (res.status(200).json({
                        updateToken
                    }))
                } else {
                    try {
                        let userData = await admin.auth().getUser(uid)
                        let signinDataStore = await userModels.signinData(uid, token, userData.email);
                        console.log(signinDataStore);
                        return (res.status(200).json({
                            signinDataStore
                        }))
                    } catch (e) {
                console.log(e);
                    }
                }
            }
            
            
           
        } catch (e) {
            console.log(e);
        }
    });

routes.
    route("/login")
    .post(async (req, res) => {
        const token = req.headers.authorization.split(" ")[1];
        try {
            let decodedToken = await admin.auth().verifyIdToken(token);
           if (decodedToken) {
                let uid = decodedToken.uid;
                const userCollection = await users();
                const exisiting_user = await userCollection.findOne({ _id: uid });
                if (exisiting_user) {
                    const updateToken = await userModels.updateAuthToken(token, uid);
                    console.log(updateToken);
                    return (res.status(200).json({
                        updateToken
                    }))
                } else {
                    try {
                        let userData = await admin.auth().getUser(uid)
                        let signinDataStore = await userModels.signinData(uid, token, userData.email);
                        console.log(signinDataStore);
                        return (res.status(200).json({
                            signinDataStore
                        }))
                    } catch (e) {
                console.log(e);
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
        
});

export default routes;
