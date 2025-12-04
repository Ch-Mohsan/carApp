require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./utlities/bd');
const authRoute = require('./routes/auth_route');

const port = 3000;
app.use(express.json());
app.use('/api/auth', authRoute);
app.get('/', (req, res) => {
  res.send('Hello World!');
});


(async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});