require('dotenv').config();

const { HARPERDB_URL, HARPERDB_PW, SOCKET_URL, PORT = 8000 } = process.env;

const CHAT_BOT = 'ChatBot';

module.exports = {
  PORT,
  HARPERDB_URL,
  HARPERDB_PW,
  SOCKET_URL,
  CHAT_BOT,
};
