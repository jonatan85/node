const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

const connect = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};

module.exports = connect;