import * as UserModel from "../models/users";

export async function verify(req, res, next) {
  try {
    var token = req.headers["x-access-token"] || req.body["x-access-token"];
    if (token) {
      console.log(`Verifying token ${token}...`);
      let user = await UserModel.findByToken(token);
      console.log(
        `User found : ${user.name}. [${user._id}] email: ${user.email} Auth success`
      );
      res.locals.user = user;
      return await next();
    } else {
      console.log("Access Token missing");
      return res.unauthorizedUser();
    }
  } catch (e) {
    if (/invalid token/i.test(e)) return res.unauthorizedUser();
    return res.error(e);
  }
}
