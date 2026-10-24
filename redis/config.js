import config from '../config/config.js';
import { createClient } from 'redis';


const redisClient = await createClient({
    url: `redis://${config.redis.host}:${config.redis.port}`,
})
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

export default redisClient;