require('dotenv').config();
require('./modules/db')();
const express = require('express');
const app = express();
const port = process.env.port || 3000;
const cors = require('cors');
const socket = require('socket.io');

// Controllers
const userRoutes = require('./routes/userRoutes');
const userProfileRoutes = require('./routes/userProfileRoute');
const postRoutes = require('./routes/postRoutes');
const contactRoutes = require('./routes/contactRoutes');
const statusRoutes = require('./routes/statusRoutes');
const messageRoutes = require('./routes/messageRoutes');


// MiddleWares
app.use(cors());
app.use(express.json({ limit: '5mb' }));


// Routes
app.use('/api/auth', userRoutes);
app.use('/api/user', userProfileRoutes);
app.use('/api/post', postRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/msg', messageRoutes);
app.get('/', (req, res) => {
  res.json({status: true, msg: "server is working as expected"});
})


// listen
const server = app.listen(port, () => {
  console.log('Example app listening on port', port);
})

// Socket io integration
const io = socket(server, { cors: { origin: "*" } });

global.onlineUsers = new Map();

io.on('connection', (socket) => {

  // join user
  socket.on("add-online", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(onlineUsers);
  });

  // check online status
  socket.on("isOnline", (userId, cb) => {
    const sendUserSocket = onlineUsers.get(userId);
    if (sendUserSocket) cb(true);
    else cb(false);
  });

  // send message
  socket.on("send-msg", (data, cb) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("recieve-msg", data.msg);
      cb(true)
    }
    else cb(false);
  });

  socket.on('disconnect', () => {
    onlineUsers.forEach((value, key, map) => {
      if (value == socket.id){
        console.log(key, "Removed form online users");
        map.delete(key);
      }
    });
  } )


});