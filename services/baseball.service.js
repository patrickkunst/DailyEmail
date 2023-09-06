const axios = require("axios");
const { BASEBALL } = require("./constants");
const moment = require("moment-timezone");

class BaseballService {
  static async getGames(teamId) {
    const games = {};
    const options = {
      method: "get",
      url: `${BASEBALL.BASE_URL}/schedule?sportId=1`,
    };

    const data = (await axios.request(options)).data.dates[0].games;
    for (let game of data) {
      if (
        game.teams.away.team.id == teamId ||
        game.teams.home.team.id == teamId
      ) {
        games[game.gamePk] = {
          gameTime: moment
            .utc(game.gameDate)
            .tz("America/Chicago")
            .format("h:MM A"),
          home: game.teams.home.team.name,
          away: game.teams.away.team.name,
        };
      }
    }

    return games;
  }
}

module.exports = BaseballService;
