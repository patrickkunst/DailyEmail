const axios = require("axios");
const { WEATHER } = require("./constants");

class WeatherService {
  static async getCurrentWeather(zipcode, apiKey) {
    const options = {
      method: "get",
      url: `${WEATHER.BASE_URL}/${WEATHER.CURRENT}?key=${apiKey}&q=${zipcode}`,
    };
    const data = await axios.request(options);
    console.log(data);
    return data;
  }
}

module.exports = WeatherService;
