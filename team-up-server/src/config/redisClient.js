import * as redis from "redis";
const RedisClient = redis.createClient();
RedisClient.connect().then(() => {});

export default RedisClient;
