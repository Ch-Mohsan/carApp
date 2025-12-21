require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const connectDB = require('./utlities/bd');
const authRoute = require('./routes/auth_route');
const errorHandler = require('./middleware/error_middleware');
const carsRoute = require('./routes/car_route');
const bookingRoute = require('./routes/booking_auth');
const port = 3000;
const cors = require('cors');

app.use(cors({
  origin: [
    "http://localhost:5173",
    'https://car-app-three-delta.vercel.app/'
  ],
}));
app.use(express.json());
// Ensure uploads directory exists and serve it statically
try {
  const uploadsDir = path.join(__dirname, 'uploads');
  fs.mkdirSync(uploadsDir, { recursive: true });
  app.use('/uploads', express.static(uploadsDir));
} catch (e) {
  console.warn('Uploads dir setup failed:', e?.message || e);
}
app.use('/api/auth', authRoute);
app.use('/api/cars', carsRoute);
app.use('/api/bookings', bookingRoute);

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