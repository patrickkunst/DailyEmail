const axios = require("axios");
const moment = require("moment");
const { WEATHER } = require("./constants");

class WeatherService {
  static async getForecast(zipcode, apiKey) {
    const options = {
      method: "get",
      url: `${WEATHER.BASE_URL}/${WEATHER.FORECAST}?key=${apiKey}&q=${zipcode}&days=1&aqi=no&alerts=no`,
    };
    const data = (await axios.request(options)).data;
    return data;
  }

  static async getAstronomy(zipcode, apiKey) {
    const now = moment().format("YYYY-MM-DD");
    const options = {
      method: "get",
      url: `${WEATHER.BASE_URL}/${WEATHER.ASTRONOMY}?key=${apiKey}&q=${zipcode}&dt=${now}`,
    };
    const data = (await axios.request(options)).data;
    return data.astronomy.astro;
  }
}

module.exports = WeatherService;
