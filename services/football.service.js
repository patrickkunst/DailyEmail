const axios = require("axios");
const moment = require("moment-timezone");
const { FOOTBALL } = require("./constants");

class FootballService {
  static async getGame(team) {
    const options = {
      method: "get",
      url: `${FOOTBALL.BASE_URL}/scoreboard`,
    };
    const games = (await axios.request(options)).data.events;
    for (let game of games) {
      if (
        game.competitions[0].competitors[0].team.id == team ||
        game.competitions[0].competitors[1].team.id == team
      ) {
        const gameTime = moment(game.date).tz("America/Chicago");
        if (gameTime.isSame(moment("2023-09-10"), "day")) {
          const footballGame = {
            time: gameTime.format("h:MM A"),
            name: game.name,
          };
          return footballGame;
        } else return; //no such thing as a football doubleheader, if we found the game and it's not today then stop.
      }
    }
  }
}

module.exports = FootballService;
