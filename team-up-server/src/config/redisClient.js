import * as redis from "redis";
let conn = {};
if (process.env.REDIS_URL) {
  conn = { url: process.env.REDIS_URL };
}
const RedisClient = redis.createClient(conn);

RedisClient.connect().then(() => {});

export default RedisClient;
