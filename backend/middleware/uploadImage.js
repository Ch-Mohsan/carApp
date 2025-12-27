const multer = require('multer');
const path = require('path');
const fs = require('fs');
// Detect if Cloudinary is configured; if so, prefer memory storage
const useCloudinary = !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);

// Compute uploads directory (supports serverless via /tmp when provided)
const UPLOADS_DIR = process.env.UPLOADS_DIR || path.join(__dirname, '..', 'uploads');

// Set up storage engine
const storage = useCloudinary
  ? multer.memoryStorage()
  : multer.diskStorage({
      destination: function (req, file, cb) {
          try {
              fs.mkdirSync(UPLOADS_DIR, { recursive: true });
          } catch (e) {
              // Best effort; multer will still attempt to write
          }
          cb(null, UPLOADS_DIR); // Directory to save uploaded images
      },
      filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique file name with original extension
      }
  });
    
// File filter to allow only images
const fileFilter = (req, file, cb) => {
    // Support common web image formats
    const allowedTypes = /jpeg|jpg|png|gif|webp|avif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only images are allowed'));
    }
};
// Initialize multer with storage engine and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});
module.exports = upload;