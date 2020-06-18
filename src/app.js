const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const routes = require('./routes');

const LogParserController = require('./controllers/logParserController');

global.XMLHttpRequest = require('xhr2');

class App {
  constructor() {
    this.server = express();

    global.logData = this.setData();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(bodyParser.urlencoded({ extended: false }));
    this.server.use(bodyParser.json());
  }

  routes() {
    this.server.use(routes);
  }

  setData() {
    const fileContent = fs.readFileSync(
      path.resolve(__dirname, '../src/data/games.log'),
      {
        encoding: 'utf8',
        flag: 'r',
      }
    );

    const logParser = new LogParserController(fileContent);
    return logParser.parse();
  }
}

module.exports = new App().server;
