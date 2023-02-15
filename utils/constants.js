require('dotenv').config();

const { HARPERDB_URL, HARPERDB_PW, PORT = 8000 } = process.env;

const CHAT_BOT = 'ChatBot';

module.exports = {
  PORT,
  HARPERDB_URL,
  HARPERDB_PW,
  CHAT_BOT,
};
