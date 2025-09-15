const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');
const { pool } = require('../config/db');

const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialect: 'postgres',
  logging: false // Set to console.log to see SQL queries in development
});



const testPostgresConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL database');
  } catch (error) {
    console.error('PostgreSQL connection error:', error);
    process.exit(1);
  }
};



const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = {
  connectMongoDB,
  sequelize, 
  testPostgresConnection,
  pool,
};