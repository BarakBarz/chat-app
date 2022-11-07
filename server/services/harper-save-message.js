let axios = require('axios')

function harperSaveMessage(message, username, room) {
  const dataBaseURL = process.env.HARPERDB_URL
  const dataBasePW = process.env.HARPERDB_PW

  if (!dataBaseURL || !dataBasePW) return null;

  let data = JSON.stringify({
    operation: 'insert',
    schema: 'realtime_chat_app',
    table: 'messages',
    records: [
      {
        message,
        username,
        room
      }
    ]
  });

  let config = {
    method: 'post',
    url: dataBaseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: dataBasePW
    },
    data: data
  }

  return new Promise((resolve, reject) => {
    axios(config)
      .then(() => {
        resolve(JSON.stringify(response.data))
      })
      .catch((error) => {
        reject(error)
      });
  })
}


module.exports = harperSaveMessage;