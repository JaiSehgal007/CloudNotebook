// this file is used to connect with the database
const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/keep_notebook"

const connectToMongo = async () => {
    await mongoose.connect(mongoURI)
}

const db = mongoose.connection;
db.on('connected', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

module.exports = connectToMongo;