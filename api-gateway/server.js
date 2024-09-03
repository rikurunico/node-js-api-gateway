const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const adminItemRoutes = require('./routes/adminItem');
const userItemRoutes = require('./routes/userItem');
const authMiddleware = require('./middleware/authMiddleware');

app.use(express.json());

// Rute untuk autentikasi
app.use('/auth', authRoutes);

// Rute untuk item yang hanya bisa diakses oleh admin
app.use('/items/admin', authMiddleware('admin'), adminItemRoutes);

// Rute untuk item yang bisa diakses oleh pengguna biasa
app.use('/items/show', authMiddleware('user'), userItemRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
