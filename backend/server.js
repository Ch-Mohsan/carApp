require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./utlities/bd');
const authRoute = require('./routes/auth_route');
const errorHandler = require('./middleware/error_middleware');
const port = 3000;

app.use(express.json());
app.use('/api/auth', authRoute);
// Register error handler AFTER routes so it can catch errors
app.use(errorHandler);

(async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});