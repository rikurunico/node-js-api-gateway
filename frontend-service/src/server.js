// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// const port = process.env.PORT || 3000;
// const apiGateway = process.env.API_GATEWAY || 'http://localhost:8080';

// app.use(cors());
// app.use(bodyParser.json());

// // Proxy login request
// app.post('/api/login', async (req, res) => {
//     try {
//         const response = await axios.post(`${apiGateway}/auth/login`, req.body);
//         res.json(response.data);
//     } catch (error) {
//         const status = error.response?.status || 500;
//         const message = error.response?.data?.message || 'Login failed';
//         if (message === 'Authentication failed') {
//             res.status(404).json({ message: 'Invalid Data' });
//         } else {
//             res.status(status).json({ message });
//         }
//     }
// });

// // Proxy get items request
// app.get('/api/items', async (req, res) => {
//     try {
//         const response = await axios.get(`${apiGateway}/items/show`, {
//             headers: {
//                 Authorization: req.headers.authorization
//             }
//         });
//         res.json(response.data);
//     } catch (error) {
//         const status = error.response?.status || 500;
//         const message = error.response?.data?.message || 'Items request failed';
//         res.status(status).json({ message });
//     }
// });

// // Proxy get items (ADMIN) request
// app.get('/api/items/admin', async (req, res) => {
//     try {
//         const response = await axios.get(`${apiGateway}/items/admin`, {
//             headers: {
//                 Authorization: req.headers.authorization
//             }
//         });
//         res.json(response.data);
//     } catch (error) {
//         const status = error.response?.status || 500;
//         const message = error.response?.data?.message || 'Admin items request failed';
//         res.status(status).json({ message });
//     }
// });

// // Proxy create item request
// app.post('/api/items', async (req, res) => {
//     try {
//         const response = await axios.post(`${apiGateway}/items/admin`, req.body, {
//             headers: {
//                 Authorization: req.headers.authorization
//             }
//         });
//         res.json(response.data);
//     } catch (error) {
//         const status = error.response?.status || 500;
//         const message = error.response?.data?.message || 'Create item request failed';
//         res.status(status).json({ message });
//     }
// });

// // Proxy update item request
// app.put('/api/items/:id', async (req, res) => {
//     try {
//         const response = await axios.put(`${apiGateway}/items/admin/${req.params.id}`, req.body, {
//             headers: {
//                 Authorization: req.headers.authorization
//             }
//         });
//         res.json(response.data);
//     } catch (error) {
//         const status = error.response?.status || 500;
//         const message = error.response?.data?.message || 'Update item request failed';
//         res.status(status).json({ message });
//     }
// });

// // Proxy delete item request
// app.delete('/api/items/:id', async (req, res) => {
//     try {
//         const response = await axios.delete(`${apiGateway}/items/admin/${req.params.id}`, {
//             headers: {
//                 Authorization: req.headers.authorization
//             }
//         });
//         res.json(response.data);
//     } catch (error) {
//         const status = error.response?.status || 500;
//         const message = error.response?.data?.message || 'Delete item request failed';
//         res.status(status).json({ message });
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });
