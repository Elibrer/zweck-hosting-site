// const express = require('express');
// const router = express.Router();
// const videoUpload = require('../multerAPI/index'); // Import the Multer middleware

// // Define a route to handle file uploads
// router.post('/uploadVideo', videoUpload.single('video'), (req, res) => {
//     res.send(req.file)
//  }, (error, req, res, next) => {
//      res.status(400).send({ error: error.message })
//  })

// module.exports = router;