const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const functions = require('firebase-functions');


const cors = require('cors'); // Import CORS middleware



const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const multer = require('multer');
const videoUpload = require('./multerAPI/multerAPI.js');
// const videoUpload = multer({ dest: 'uploads/' }); // Configure Multer for video uploads

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads/videos', express.static(path.join(__dirname, 'uploads/videos')));

// Route for handling video uploads
app.post('/api/uploadVideo', videoUpload.single('video'), (req, res) => {
  // Handle video upload logic here
  // console.log(req.file)
  // console.log(req.file.path)
  // console.log(req.body.userID)

  const { file } = req;

  const databaseEntry = {
    name: req.file.filename,
    path: req.file.path,
    userID: req.body.userID
  };
  //console.log(databaseEntry)
  res.status(200).json(databaseEntry);

  if (!file) {
    return res.status(400).send('No video uploaded');
  }
});

// Serve client/build as static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Route for handling all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Start Apollo Server
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
};

// Start MongoDB connection and then start the server
db.once('open', () => {
  startApolloServer();
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});


exports.api = functions.https.onRequest(app);
