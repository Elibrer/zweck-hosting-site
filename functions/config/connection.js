const mongoose = require('mongoose');

const connectionURI = process.env.MONGODB_URI || process.env.FUNCTIONS_MONGODB_URI;
mongoose.connect(connectionURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

module.exports = mongoose.connection;
