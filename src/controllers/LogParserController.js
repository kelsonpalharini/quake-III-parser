const INIT_GAME_CONTENT = 'InitGame:';
const USER_CONTENT = 'ClientUserinfoChanged:';
const KILL_CONTENT = 'Kill:';
const WORLD_USERNAME = '<world>';

class LogParserController {
  constructor(fileContent) {
    this.lines = fileContent.split('\n');
    this.games = [];
  }

  newGame() {
    const idx = this.games.length + 1;

    this.games.push({
      game: {
        id: `game_${parseInt(idx, 10)}`,
        total_kills: 0,
        players: [],
        kills: {},
      },
    });
  }

  newUser(content) {
    const userName = content.match(
      /ClientUserinfoChanged: [0-9]* n\\(.*)\\t\\[0-9]+\\model/
    )[1];

    const { game } = this.getLastGame();

    if (game.players.indexOf(userName) === -1) {
      game.players.push(userName);
    }
  }

  newKill(content) {
    const { game } = this.getLastGame();

    game.total_kills++;
    const userName = content[5];

    if (userName === WORLD_USERNAME) {
      this.newWorldKill(content);
      return;
    }

    this.newUserKill(userName, content);
  }

  newWorldKill(content) {
    const killedBy = content.indexOf('killed');
    let killed = content[killedBy + 1];

    for (let idx = killedBy + 2; idx < content.length; idx++) {
      if (content[idx] === 'by') {
        break;
      }

      killed = `${killed} ${content[idx]}`;
    }

    const { game } = this.getLastGame();

    game.kills[killed] = game.kills[killed] - 1 || -1;
  }

  newUserKill(user, content) {
    for (let idx = 6; idx < content.length; idx++) {
      if (content[idx] === 'killed') {
        break;
      }
      user = `${user} ${content[idx]}`;
    }

    const { game } = this.getLastGame();

    game.kills[user] = game.kills[user] + 1 || 1;
  }

  getLastGame() {
    const index = this.games.length;

    return this.games[index - 1];
  }

  parse() {
    this.lines.forEach((line) => {
      const detail = line.trim().split(' ');

      switch (detail[1]) {
        case INIT_GAME_CONTENT:
          this.newGame();
          break;

        case USER_CONTENT:
          this.newUser(line);
          break;

        case KILL_CONTENT:
          this.newKill(detail);
          break;

        default:
          break;
      }
    });

    const { games } = this;
    if (games.length === 0) {
      return { error: 'No game found on the logfile' };
    }

    return games;
  }
}

module.exports = LogParserController;
