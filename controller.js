//Using this to control the application so we can work with async/await
require("dotenv").config();

const WeatherService = require("./services/weather.service");

const weatherKey = process.env.WEATHER_API_KEY;
const zipcode = process.env.ZIPCODE;

const controller = async () => {
  let weatherRawData, astroRawData;
  try {
    weatherRawData = await WeatherService.getForecast(zipcode, weatherKey);
  } catch (err) {
    console.error("Error occurred while fetching weather data:", err.message);
  }

  try {
    astroRawData = await WeatherService.getAstronomy(zipcode, weatherKey);
  } catch (err) {
    console.error("Error occurred while fetching astronomy data:", err.message);
  }
};

module.exports = controller;
