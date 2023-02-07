# Chat Room App

Fullstack web application Built with HarperDB, React, Express, SocketIO, JS.

clone repository.

## Installation guide

### Setting up the DB

create harperDB account and create a free instance go to settings and copy your
domain and password.

place this code in .env in root folder of repo:

```
HARPERDB_PW="YOUR-PASS-FROM-HARPERDB"
HARPERDB_URL="YOUR-DOMAIN"
```

Back at the HarperDB website, click on the instance you created Click browse
Click on the plus button to the schemas Create a schema named
`realtime_chat_app` Click on plus button next to tables Name: `messages` hash
attr.: `id`

That's it. you have the database running and waiting to recieve messages and
store them.

### installing dependencies and running locally

Run this in root directory of repo:

```bash
npm i
npm run frontend

npm run api // other terminal
```

Have fun
