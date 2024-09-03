const axios = require('axios');
const redis = require('redis');
const client = redis.createClient({ url: `redis://${process.env.REDIS_HOST}:6379` });

client.connect();

module.exports = (role) => async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const cachedToken = await client.get(token);
        if (cachedToken) {
            const user = JSON.parse(cachedToken);
            if (user.role !== role) {
                return res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
            }
            req.user = user;
            return next();
        }

        const response = await axios.post(`${process.env.AUTH_SERVICE_URL}/validate`, { token });
        if (response.data.valid) {
            await client.set(token, JSON.stringify(response.data), { EX: response.data.exp });
            if (response.data.role !== role) {
                return res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
            }
            req.user = response.data;
            next();
        } else {
            res.status(401).json({ message: 'Invalid token' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Token validation failed' });
    }
};
