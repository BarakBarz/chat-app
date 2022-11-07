const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { PORT } = require('./utils/constants');
const CHAT_BOT = 'ChatBot';
let chatRoom = '';
let allUsers = [];

const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Listen for client connecting via socket.io
io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

  // Add a user to a room
  socket.on('join_room', (data) => {
    const { username = 'Israel Israeli', room } = data;
    socket.join(room);

    let __createdtime__ = Date.now();

    // notify all users in room that user has joined
    socket.to(room).emit('recieve_message', {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      __createdtime__,
    });

    // send welcome message to user who joined chat
    socket.emit('recieve_message', {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      __createdtime__,
    });

    // Save new user to room
    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit('chatroom_users', chatRoomUsers);
    socket.emit('chatroom_users', chatRoomUsers);
  });

  socket.on('disconnect', (reason) => {
    console.log(`socket ${socket.id} disconnected due to ${reason}`);
  });
});

server.listen(PORT, () => console.log('Server is running on port 4000'));
