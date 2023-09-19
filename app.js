const controller = require("./controller");

console.info("----Starting DailyEmail----");
controller().then(() => {
  console.info("----Done----");
  console.info({
    done: 1,
  });
});
