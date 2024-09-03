const express = require('express');
const router = express.Router();
const axios = require('axios');
const itemServices = process.env.ITEM_SERVICE_URL;

// Menampilkan semua item (Bisa diakses oleh pengguna biasa)
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${itemServices}/items`, {
            headers: { Authorization: req.headers['authorization'] },
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.message });
    }
});

// Menampilkan item berdasarkan ID (Bisa diakses oleh pengguna biasa)
router.get('/:id', async (req, res) => {
    try {
        const response = await axios.get(`${itemServices}/items/${req.params.id}`, {
            headers: { Authorization: req.headers['authorization'] },
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.message });
    }
});

module.exports = router;
