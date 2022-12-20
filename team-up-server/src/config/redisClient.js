import * as redis from "redis";
const RedisClient = redis.createClient({
  url: process.env.REDIS_URI,
});
RedisClient.connect().then(() => {});

export default RedisClient;
