class GameService {
  async getAll(req, res) {
    res.json(global.logData);
  }
}

module.exports = new GameService();
