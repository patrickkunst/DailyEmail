const axios = require("axios");
const moment = require("moment");
const { WEATHER } = require("./constants");
const { WeatherHelper } = require("../helpers/helpers");

class WeatherService {
  static async getForecast(zipcode, apiKey, data, errors) {
    const options = {
      method: "get",
      url: `${WEATHER.BASE_URL}/${WEATHER.FORECAST}?key=${apiKey}&q=${zipcode}&days=1&aqi=no&alerts=no`,
    };
    try {
      const weather = (await axios.request(options)).data;
      data.weather = WeatherHelper.prepareForecast(weather);
    } catch (err) {
      errors.weather = err.message;
    }
  }

  static async getAstronomy(zipcode, apiKey, data, errors) {
    const now = moment().format("YYYY-MM-DD");
    const options = {
      method: "get",
      url: `${WEATHER.BASE_URL}/${WEATHER.ASTRONOMY}?key=${apiKey}&q=${zipcode}&dt=${now}`,
    };
    try {
      const astro = (await axios.request(options)).data;
      data.astro = astro.astronomy.astro;
    } catch (err) {
      errors.astro = err.message;
    }
  }
}

module.exports = WeatherService;
