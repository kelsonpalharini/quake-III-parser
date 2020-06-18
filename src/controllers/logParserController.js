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
    this.games.push({
      game: {
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

    if (
      this.games[this.games.length - 1].game.players.indexOf(userName) === -1
    ) {
      this.games[this.games.length - 1].game.players.push(userName);
    }
  }

  newKill(content) {
    this.games[this.games.length - 1].game.total_kills++;
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

    this.games[this.games.length - 1].game.kills[killed] =
      this.games[this.games.length - 1].game.kills[killed] - 1 || -1;
  }

  newUserKill(user, content) {
    for (let idx = 6; idx < content.length; idx++) {
      if (content[idx] === 'killed') {
        break;
      }
      user = `${user} ${content[idx]}`;
    }

    this.games[this.games.length - 1].game.kills[user] =
      this.games[this.games.length - 1].game.kills[user] + 1 || 1;
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

    return this.games;
  }
}

module.exports = LogParserController;
