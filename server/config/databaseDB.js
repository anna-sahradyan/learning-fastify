const mongoose = require('mongoose');
const configureDatabase = async ({ uri, options }) => {
  try {
    await mongoose.connect(uri, options);
    console.log('Connected to the database ');
    return mongoose.connection;
  } catch (err) {
    console.error('Error connecting to the database', err);
    throw err;
  }
};
module.exports = configureDatabase;
