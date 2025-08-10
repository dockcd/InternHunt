// require('dotenv').config(); // Load environment variables

// const express = require('express');
// const app = express();

// const { connectMongoDB, testPostgresConnection } = require('./src/config/db');
// const userRoutes = require('./src/routes/userRoutes');
// const {sequelize} = require('./src/config/db');

// // Connect to databases
// connectMongoDB();
// testPostgresConnection();

// sequelize.sync({ alter: true }) // or { force: true } to drop & recreate
//   .then(() => {
//     console.log('Database synced');
//   })
//   .catch(err => {
//     console.error('Error syncing database:', err);
//   });


// app.use(express.json());
// app.use('/api/users', userRoutes);

// // Server listener
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




require('dotenv').config();

const express = require('express');
const app = express();

const { connectMongoDB, testPostgresConnection, sequelize } = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');
const studentRoutes = require('./src/routes/studentRoutes');

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/students/details', studentRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to databases
    await connectMongoDB();
    await testPostgresConnection();

    // Sync Sequelize models with DB
    await sequelize.sync({ alter: true });
    console.log('Database synced');

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Startup failed:', err);
    process.exit(1);
  }
}

startServer();