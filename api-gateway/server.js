const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const adminItemRoutes = require('./routes/adminItem');
const userItemRoutes = require('./routes/userItem');
const authMiddleware = require('./middleware/authMiddleware');

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Jika metode adalah OPTIONS, kita langsung kirimkan respons OK (200)
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Berikan respons OK untuk preflight request
  }

  next();
});

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
