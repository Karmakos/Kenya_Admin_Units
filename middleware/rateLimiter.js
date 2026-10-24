import redisClient from '../redis/config.js';
import { tooManyRequestsError } from '../utils/errorHandlers.js';

export async function rateLimiter(req, res, next) {
    // Get the IP address of the client(if were using a proxy, we need to modify this to use req.headers['x-forwarded-for'] instead of req.ip)
    const ip = req.ip;

    const key = `rate_limit:${ip}`;
    const maxRequests = 10; // Max of 10 requests per minute      

    const windowSizeInSeconds = 60; // 1 minute

    const currentRequests = await redisClient.INCR(key);

    if (currentRequests === 1) {
        await redisClient.EXPIRE(key, windowSizeInSeconds);
    }

    if (currentRequests > maxRequests) {
        tooManyRequestsError();

        redisClient.destroy();

    }
    next();
}