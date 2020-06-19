const request = require('request');

class GameService {
  getAll(req, res) {
    res.json(global.logData);
  }

  getReport(req, res) {
    const data = {
      template: { shortid: 'ByeT67VKp8' },
      items: global.logData,
      options: { preview: true },
    };

    const options = {
      uri: 'https://palharii.jsreportonline.net/api/report',
      method: 'POST',
      auth: {
        username: 'kelsonpalharini@bsd.com.br',
        password: 'reportTest',
      },
      json: data,
    };

    request(options).pipe(res);
  }
}

module.exports = new GameService();
