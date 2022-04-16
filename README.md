<!-- "heroku-postbuild": "yarn build", -->

# Title 1

test scripts

## Scripts

"start": "node server.js",
"start": "if-env NODE_ENV=production && yarn start:prod || yarn start:dev",
"start:dev": "concurrently \"nodemon --ignore 'client/\*'\" \"yarn client\"",

"heroku-postbuild": "yarn build",

"install": "cd client && yarn install",
"client": "cd client && yarn start",
"build": "cd client && yarn build",

"start": "concurrently --kill-others-on-fail \"yarn start:prod\" \"yarn start --prefix client\"",

## Old imports from Server.js

// import dbo from "./db/conn.js";
