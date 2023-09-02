const axios = require("axios");
const { WEATHER } = require("./constants");

class WeatherService {
  static async getForecast(zipcode, apiKey) {
    const options = {
      method: "get",
      url: `${WEATHER.BASE_URL}/${WEATHER.FORECAST}?key=${apiKey}&q=${zipcode}&days=1&aqi=no&alerts=no`,
    };
    const data = (await axios.request(options)).data;
    console.log(data);
    return data;
  }
}

module.exports = WeatherService;
