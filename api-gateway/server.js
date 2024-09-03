const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');

app.use(express.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
