require('dotenv').config();
require('./modules/db')();
const express = require('express');
const app = express();
const port = process.env.port || 3000;
const cors = require('cors');

// Controllers
const userRoutes = require('./routes/userRoutes');
const userProfileRoutes = require('./routes/userProfileRoute');
const postRoutes = require('./routes/postRoutes');
const contactRoutes = require('./routes/contactRoutes');
const statusRoutes = require('./routes/statusRoutes');

// MiddleWares
app.use(cors());
app.use(express.json({ limit: '5mb' }));


// Routes
app.use('/api/auth', userRoutes);
app.use('/api/user', userProfileRoutes);
app.use('/api/post', postRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/status', statusRoutes);


app.listen(port, () => {
  console.log('Example app listening on port', port);
})
