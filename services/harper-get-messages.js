const axios = require('axios');

function harperGetMessage(room) {
  const dataBaseURL = process.env.HARPERDB_URL;
  const dataBasePW = process.env.HARPERDB_PW;

  if (!dataBaseURL || !dataBasePW) return null;

  let data = JSON.stringify({
    operation: 'sql',
    sql: `SELECT * FROM realtime_chat_app.messages WHERE room = '${room}' LIMIT 100`,
  });

  let config = {
    method: 'post',
    url: dataBaseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: dataBasePW,
    },
    data: data,
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then((response) => {
        resolve(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log('occured on promise harperGetMessage:', error);
        reject(error);
      });
  });
}

module.exports = harperGetMessage;
