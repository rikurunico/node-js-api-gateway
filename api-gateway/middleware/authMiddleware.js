const axios = require('axios');
const redis = require('redis');

// Konfigurasi Redis Client
const client = redis.createClient({ url: `redis://${process.env.REDIS_HOST}:6379` });

client.connect();

module.exports = (role) => async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Cek apakah token sudah ada di cache Redis
        const cachedToken = await client.get(token);
        if (cachedToken) {
            const user = JSON.parse(cachedToken);
            // Cek apakah role sesuai dengan role yang diminta
            if (user.role !== role) {
                return res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
            }
            req.user = user; // Tambahkan data user ke request
            return next();
        }

        // Validasi token dengan auth-service
        const response = await axios.post(`${process.env.AUTH_SERVICE_URL}/validate`, { token });
        if (response.data.valid) {
            // Simpan hasil validasi ke Redis
            await client.set(token, JSON.stringify(response.data), { EX: response.data.exp });
            // Cek apakah role sesuai dengan role yang diminta
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
