//connection to database
const mongoose = require('mongoose');

//require config package
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });

    console.log('mongo DB connected');
  } catch (err) {
    console.error('MongoDB connect error: ' + err.message);
    //exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
