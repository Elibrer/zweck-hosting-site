const mongoose = require('mongoose');

const connectionURI = "mongodb+srv://elibrer:elibrer@zweck-hosting.sf1ueo9.mongodb.net/?retryWrites=true&w=majority&appName=Zweck-hosting"
mongoose.connect(connectionURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

module.exports = mongoose.connection;
