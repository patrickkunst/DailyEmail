const BaseballService = require("./services/baseball.service");

const test = async () => {
  await BaseballService.getGames(145);
};

test();
