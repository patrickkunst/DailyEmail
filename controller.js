//Using this to control the application so we can work with async/await
require("dotenv").config();

//Services
const WeatherService = require("./services/weather.service");
const HolidayService = require("./services/holidays.service");
const EmailService = require("./services/email.service");
const BaseballService = require("./services/baseball.service");

//Helper class to prepare email content
const { DataHelper } = require("./helpers/helpers");
const FootballService = require("./services/football.service");

//weather api constants
const weatherKey = process.env.WEATHER_API_KEY;
const zipcode = process.env.ZIPCODE;

//holiday api constants
const holidayKey = process.env.HOLIDAY_API_KEY;

//nodemailer constants
const appPass = process.env.APP_PASSWORD;
const emailFrom = process.env.EMAIL_ACCOUNT;
const emailTo = process.env.EMAIL_TO;
const mlbteam = process.env.MLB_TEAM_ID;
const nflteam = process.env.NFL_TEAM;

const controller = async () => {
  const errors = {};
  const data = {};
  await Promise.allSettled([
    WeatherService.getForecast(zipcode, weatherKey, data, errors),
    WeatherService.getAstronomy(zipcode, weatherKey, data, errors),
    HolidayService.getHolidays(holidayKey, data, errors),
    BaseballService.getGames(mlbteam, data, errors),
    FootballService.getGame(nflteam, data, errors),
  ]);

  const emailContent = await DataHelper.prepareContent(data, errors);

  console.log(emailContent);

  await EmailService.sendEmail(emailFrom, appPass, emailTo, emailContent); //not handling errors here - this is the final step and is the only thing that absolutely needs to work
};

module.exports = controller;
