const axios = require("axios");
const moment = require("moment-timezone");
const { FOOTBALL } = require("./constants");

class FootballService {
  static async getGame(team, data, errors) {
    const options = {
      method: "get",
      url: `${FOOTBALL.BASE_URL}/scoreboard`,
    };
    console.info({
      service: "FootballService",
      message: "Sending Football API request",
      request: options,
    });

    try {
      const games = (await axios.request(options)).data.events;
      console.info({
        service: "FootballService",
        message: "API Response received",
      });

      for (let game of games) {
        if (
          game.competitions[0].competitors[0].team.id == team ||
          game.competitions[0].competitors[1].team.id == team
        ) {
          const gameTime = moment(game.date).tz("America/Chicago");
          if (gameTime.isSame(moment(), "day")) {
            const footballGame = {
              time: gameTime.format("h:MM A"),
              name: game.name,
            };
            data.football = footballGame;
          } else return; //no such thing as a football doubleheader, if we found the game and it's not today then stop.
        }
      }
    } catch (err) {
      errors.football = err.message;
      console.error({
        service: "FootballService",
        error: err.message,
      });
    }
  }
}

module.exports = FootballService;
