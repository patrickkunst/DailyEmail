const axios = require("axios");
const { BASEBALL } = require("./constants");
const moment = require("moment-timezone");

class BaseballService {
  static async getGames(teamId, data, errors) {
    const games = {};
    const today = moment().tz("America/Chicago").format("YYYY-MM-DD");
    const options = {
      method: "get",
      url: `${BASEBALL.BASE_URL}/schedule?sportId=1&startDate=${today}&endDate=${today}`,
    };
    console.info({
      service: "BaseballService",
      message: "Sending API request to MLBStats",
      request: options,
    });

    try {
      const gameRawData = (await axios.request(options)).data.dates[0].games;
      console.info({
        service: "BaseballService",
        message: "API Response received",
      });

      for (let game of gameRawData) {
        if (
          game.teams.away.team.id == teamId ||
          game.teams.home.team.id == teamId
        ) {
          console.info({
            service: "BaseballService",
            message: "Found a matching game!",
          });

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
      console.info({
        service: "BaseballService",
        games: games,
      });

      data.baseball = games;
    } catch (err) {
      errors.baseball = err.message;
      console.error({
        service: "BaseballService",
        error: err.message,
      });
    }
  }
}

module.exports = BaseballService;
