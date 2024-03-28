// multerAPI.js

const multer = require('multer');

// Set up storage configuration for videos
const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/videos/'); // Destination folder where video files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Preserve the original filename and extension
  },
});

// Set up multer instance for video uploads with storage configuration
const videoUpload = multer({
  storage: videoStorage,
  limits: {
    fileSize: 100000000 // 10 MB limit for file size
  },
  fileFilter(req, file, cb) {
    // Accept only mp4 and mkv format for video uploads
    if (!file.originalname.match(/\.(mp4|MPEG-4|mkv|webm)$/)) {
      return cb(new Error('Please upload a video in mp4 or mkv format'));
    }
    cb(null, true);
  }
});

module.exports = videoUpload;
