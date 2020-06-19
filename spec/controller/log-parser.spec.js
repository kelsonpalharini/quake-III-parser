/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');

const LogParserController = require('../../src/controllers/LogParserController');

describe('LogParserController', () => {
  const content = fs.readFileSync(
    path.resolve(__dirname, '../../spec/data/games.log'),
    {
      encoding: 'utf8',
      flag: 'r',
    }
  );

  describe('parse', () => {
    it('This method should parse the log file and retrieve some game information', (done) => {
      const logParserController = new LogParserController(content);
      const games = logParserController.parse();
      expect(games[1]).toEqual({
        game: {
          id: 'game_2',
          total_kills: 11,
          players: ['Isgalamido', 'Dono da Bola', 'Mocinha'],
          kills: {
            Isgalamido: -5,
          },
        },
      });

      done();
    });

    it('This method should return 21 games', (done) => {
      const logParserController = new LogParserController(content);
      const games = logParserController.parse();

      expect(Object.keys(games).length).toEqual(21);
      done();
    });

    it('This method should return an error', (done) => {
      const logParserController = new LogParserController('');
      const games = logParserController.parse();

      expect(games).toEqual({ error: 'No game found on the logfile' });
      done();
    });
  });
});
