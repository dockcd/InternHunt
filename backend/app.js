require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

const { connectMongoDB, testPostgresConnection, sequelize } = require('./src/config/db');
const { authMiddleware } = require("./src/middleware/authMiddleware");
const userRoutes = require('./src/routes/userRoutes');
const studentRoutes = require('./src/routes/studentRoutes');
const internshipRoutes = require('./src/routes/internshipRoutes');
const documentRoutes = require('./src/routes/documentRoutes');
const guideRoutes = require('./src/routes/guideRoutes');
const announcementRoutes = require('./src/routes/announcementRoutes');


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true                   
}));


app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/students/details', studentRoutes);
app.use('/api/students/internships', internshipRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/guide', guideRoutes);
app.use('/api/announcements', announcementRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectMongoDB();
    await testPostgresConnection();

    await sequelize.sync({ alter: true });          
    console.log('Database synced');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Startup failed:', err);
    process.exit(1);
  }
}

startServer();