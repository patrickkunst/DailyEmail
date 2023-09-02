//Using this to control the application so we can work with async/await
require("dotenv").config();

const WeatherService = require("./services/weather.service");

const weatherKey = process.env.WEATHER_API_KEY;
const zipcode = process.env.ZIPCODE;

const controller = async () => {
  const weatherRawData = await WeatherService.getForecast(zipcode, weatherKey);
  console.log(weatherRawData.forecast);
};

module.exports = controller;
