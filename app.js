const express = require('express');

const app = express();
const http = require('http');
const path = require('path');

const cors = require('cors');
const { Server } = require('socket.io');
const harperSaveMessage = require('./services/harper-save-message');
const harperGetMessages = require('./services/harper-get-messages');
const leaveRoom = require('./utils/leave-room');

const {
  PORT,
  HARPERDB_URL,
  HARPERDB_PW,
  CHAT_BOT,
} = require('./utils/constants');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: `http://0.0.0.0:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

let chatRoom = '';
let allUsers = [];

app.use(express.static(path.join(__dirname, 'client', 'build')));
// Listen for client connecting via socket.io-client
io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);
  // Add a user to a room
  socket.on('join_room', (data) => {
    const { username, room } = data;
    socket.join(room);

    let __createdtime__ = Date.now();

    harperGetMessages(room)
      .then((lastHundredMessages) => {
        socket.emit('last_hundred_messages', lastHundredMessages);
      })
      .catch((err) => console.log(err));

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

    // Send chatroom user data to render in client side
    socket.to(room).emit('chatroom_users', chatRoomUsers);
    socket.emit('chatroom_users', chatRoomUsers); // send to user all other users in room
  });

  // Add event to listener for user typing
  socket.on('typing', (data) => {
    const { username, room } = data;
    // Notify all other users in room that user is typing
    socket.to(room).emit('user_typing', { username });
  });

  // Receive message from user on client, send to all users in chat room and save to HarperDB
  socket.on('send_message', (data) => {
    const { message, username, room, __createdtime__ } = data;
    io.in(room).emit('receive_message', data);

    harperSaveMessage(message, username, room, __createdtime__)
      .then((response) => console.log('harperSaveMessage response:', response))
      .catch((err) => console.log(err));
  });

  socket.on('leave_room', (data) => {
    const { username, room } = data;
    socket.leave(room);
    const __createdtime__ = Date.now();

    // Remove user from memory
    allUsers = leaveRoom(socket.id, allUsers);
    socket.to(room).emit('chatroom_users', allUsers);
    socket.to(room).emit('receive_message', {
      username: CHAT_BOT,
      message: `${username} has left the chat`,
      __createdtime__,
    });
    console.log(`${username} has left the chat`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from the chat');
    const user = allUsers.find((user) => user.id == socket.id);
    if (user?.username) {
      allUsers = leaveRoom(socket.id, allUsers);
      socket.to(chatRoom).emit('chatroom_users', allUsers);
      socket.to(chatRoom).emit('receive_message', {
        message: `${user.username} has disconnected from the chat.`,
      });
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

server.listen(PORT, () => console.log('Server is running on port: ' + PORT));
