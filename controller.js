//Using this to control the application so we can work with async/await
require("dotenv").config();

const WeatherService = require("./services/weather.service");
const HolidayService = require("./services/holidays.service");
const EmailService = require("./services/email.service");

//weather api constants
const weatherKey = process.env.WEATHER_API_KEY;
const zipcode = process.env.ZIPCODE;

//holiday api constants
const holidayKey = process.env.HOLIDAY_API_KEY;

//nodemailer constants
const appPass = process.env.APP_PASSWORD;
const emailFrom = process.env.EMAIL_ACCOUNT;
const emailTo = process.env.EMAIL_TO;

const controller = async () => {
  const errors = {};
  const data = {};

  try {
    data.weatherRawData = await WeatherService.getForecast(zipcode, weatherKey);
  } catch (err) {
    console.error("Error occurred while fetching weather data:", err.message);
    errors.weather = err.message;
  }

  try {
    data.astroRawData = await WeatherService.getAstronomy(zipcode, weatherKey);
  } catch (err) {
    console.error("Error occurred while fetching astronomy data:", err.message);
    errors.astro = err.message;
  }

  try {
    data.holidayRawData = await HolidayService.getHolidays(holidayKey);
  } catch (err) {
    console.error("Error occurred while fetching holiday data:", err);
    errors.holiday = err.message;
  }

  await EmailService.sendEmail(
    emailFrom,
    appPass,
    emailTo,
    "<h1>Test Email HTML!</h1>"
  ); //not handling errors here - this is the final step and is the only thing that absolutely needs to work
};

module.exports = controller;
