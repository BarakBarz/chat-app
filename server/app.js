const express = require('express');

const app = express();
const http = require('http');

const cors = require('cors');
const { Server } = require('socket.io');
const harperSaveMessage = require('./services/harper-save-message')

const { PORT, HARPERDB_URL,
  HARPERDB_PW, CHAT_BOT } = require('./utils/constants');


let chatRoom = '';
let allUsers = [];

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Listen for client connecting via socket.io-client
io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

  // Add a user to a room
  socket.on('join_room', (data) => {
    const { username, room } = data;
    socket.join(room);

    let __createdtime__ = Date.now();

    // notify all users in room that user has joined
    socket.to(room).emit('receive_message', {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      __createdtime__,
    });

    // send welcome message to user who joined chat
    socket.emit('receive_message', {
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

  // recieve message from user, send to all users in chat room and save to HarperDB 

  socket.on('send_message', (data) => {
    const { message, username, room, __createdtime__ } = data;
    io.in(room).emit('receive_message', data)
    harperSaveMessage(message, username, room, __createdtime__)
      .then(response => console.log(response))
      .catch((err) => console.log(err))
  })
});

server.listen(PORT, () => console.log('Server is running on port 4000'));