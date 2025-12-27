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

// CORS configuration: allow known frontend origins and handle preflight
const allowedOrigins = (
  process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim()).filter(Boolean)
    : [
        'http://localhost:5173',
        'https://car-app-three-delta.vercel.app', // note: no trailing slash
      ]
);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (no Origin)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
// Handle CORS preflight safely on Express v5 without wildcard routes
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Vary', 'Origin');
  }
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.sendStatus(204);
  }
  next();
});
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