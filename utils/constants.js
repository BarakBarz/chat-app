require('dotenv').config();

const {
  HARPERDB_URL = process.env.HARPERDB_URL,
  HARPERDB_PW = process.env.HARPERDB_URL,
  PORT = process.env.PORT || 8000,
} = process.env;

const CHAT_BOT = 'ChatBot';

module.exports = {
  PORT,
  HARPERDB_URL,
  HARPERDB_PW,
  CHAT_BOT,
};
