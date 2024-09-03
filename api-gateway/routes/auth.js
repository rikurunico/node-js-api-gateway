const express = require('express');
const router = express.Router();
const axios = require('axios');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', async (req, res) => {
    try {
        const response = await axios.post(`${process.env.AUTH_SERVICE_URL}/login`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Authentication failed' });
    }
});

// Protected route with role-based access control
router.get('/admin', authMiddleware('admin'), (req, res) => {
    res.send('Admin access granted');
});

router.get('/user', authMiddleware('user'), (req, res) => {
    res.send('User access granted');
});

module.exports = router;