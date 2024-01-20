const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/test";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            // Use the new URL parser and unified topology options
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

module.exports = connectToMongo;
