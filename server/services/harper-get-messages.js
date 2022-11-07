
function harperSaveMessage(room) {
  const dataBaseURL = process.env.HARPERDB_URL
  const dataBasePW = process.env.HARPERDB_PW

  if (!dataBaseURL || !dataBasePW) return null

  let data = JSON.stringify({
    operation: 'sql',
    sql: `SELECT * FROM realtime_chat_app.messages WHERE room = '${room}' LIMIT 100`
  })
}