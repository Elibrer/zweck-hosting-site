const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || process.env.mongodb_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
