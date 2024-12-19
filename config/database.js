// config/database.js

import mongoose from 'mongoose';

const dbConnect = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('Already connected to the database');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

export default dbConnect;
