import RedisClient from "../config/redisClient";

export async function verify(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let isExist = await RedisClient.hExists("users", token);
      if (isExist) {
        console.log(`Verifying token ${token}...`);
        let isUser = await RedisClient.hGet("users", token);
        console.log(`User found : email: ${isUser} Auth success`);
        res.locals.user = isUser;
        return await next();
      } else {
        console.log("Invalid Token");
        return res.unauthorizedUser();
      }
    } else {
      console.log("Access Token missing");
      return res.unauthorizedUser();
    }
  } catch (e) {
    if (/invalid token/i.test(e)) return res.unauthorizedUser();
    return res.error(e);
  }
}
