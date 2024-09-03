const express = require('express');
const router = express.Router();
const axios = require('axios');
const itemServices = process.env.ITEM_SERVICE_URL;

// Membuat item (Hanya untuk admin)
router.post('/', async (req, res) => {
    try {
        const response = await axios.post(`${itemServices}/items`, req.body, {
            headers: { Authorization: req.headers['authorization'] },
        });
        res.status(201).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.message });
    }
});

// Mengupdate item berdasarkan ID (Hanya untuk admin)
router.put('/:id', async (req, res) => {
    try {
        const response = await axios.put(`${itemServices}/items/${req.params.id}`, req.body, {
            headers: { Authorization: req.headers['authorization'] },
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.message });
    }
});

// Menghapus item berdasarkan ID (Hanya untuk admin)
router.delete('/:id', async (req, res) => {
    try {
        const response = await axios.delete(`${itemServices}/items/${req.params.id}`, {
            headers: { Authorization: req.headers['authorization'] },
        });
        res.status(204).send();
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.message });
    }
});

module.exports = router;
