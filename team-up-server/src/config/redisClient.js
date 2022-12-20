import * as redis from "redis";
const RedisClient = redis.createClient({
  url: "redis://default:UalgWaPtqzDLjGLcxA6rASDS4TImDCXo@redis-15932.c11.us-east-1-2.ec2.cloud.redislabs.com:15932",
});
RedisClient.connect().then(() => {});

export default RedisClient;
