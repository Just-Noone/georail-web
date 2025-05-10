// public/assets/js/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Use an environment variable for the MongoDB URI in production
        // For local development, you can use a direct string or a .env file
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/yourdbname_placeholder';
        
        await mongoose.connect(MONGODB_URI, {
            // useNewUrlParser and useUnifiedTopology are true by default in Mongoose 6+
            // and no longer need to be explicitly set.
            // useCreateIndex and useFindAndModify are also no longer supported options.
        });
        console.log('MongoDB Connected successfully.');
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
        // Exit process with failure if the database connection fails
        process.exit(1);
    }
};

module.exports = connectDB;