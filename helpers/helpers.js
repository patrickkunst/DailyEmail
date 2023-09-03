const moment = require("moment");

class WeatherHelper {
  //reformat the object so that any changes to the api format response only need to be changed here
  static async prepareForecast(data) {
    const forecastData = {
      current: data.current.temp_f,
      min: data.forecast.forecastday[0].day.mintemp_f,
      max: data.forecast.forecastday[0].day.maxtemp_f,
      rain: data.forecast.forecastday[0].day.daily_chance_of_rain,
      snow: data.forecast.forecastday[0].day.daily_chance_of_snow,
      condition: data.forecast.forecastday[0].day.condition.text,
    };
    return forecastData;
  }
}

class HolidayHelper {
  //this helper isn't completely necessary, but adding it just in case it's needed down the line
  static async prepareHolidays(data) {
    const holidays = [];
    for (let holiday of data) {
      holidays.push({
        name: holiday.name,
        description: holiday.description,
      });
    }
    return holidays;
  }
}

class DataHelper {
  static async prepareContent(data, errors) {
    let html = `<h1>Daily Digest for ${moment().format("MM-DD-YYYY")}</h1>`;
    let error = false;
    if (!errors.weather) {
      html += `<h2>Weather</h2>
      <div>Current temperature: ${data.weather.current} degrees and ${data.weather.condition}</div>
      <div>High: ${data.weather.max} degrees Farenheit</div>
      <div>Low: ${data.weather.min} degrees Farenheit`;

      if (data.weather.rain)
        html += `<div>${data.weather.rain} percent chance of rain</div>`;
      if (data.weather.snow)
        html += `<div>${data.weather.snow} percent chance of snow</div>`;
    } else error = true;

    if (!errors.astro) {
      html += `<h2>Astronomy</h2>
      <div>Sunrise: ${data.astro.sunrise}</div>
      <div>Sunset: ${data.astro.sunset}</div>
      <div>Moon Phase tonight: ${data.astro.moon_phase}</div>`;
    } else error = true;

    if (!errors.holiday) {
      if (data.holidays.length) {
        html += `<h2>Holidays</h2>`;
        for (let holiday of data.holidays) {
          html += `<div>${holiday.name}: ${holiday.description}</div>`;
        }
      }
    } else error = true;

    if (error) {
      html += "<h2>Errors Today</h2>";
      if (errors.weather) html += `<div>Weather Error: ${errors.weather}</div>`;
      if (errors.astro) html += `<div>Astro Error: ${errors.astro}</div>`;
      if (errors.holiday) html += `<div>Holiday Error: ${errors.holiday}</div>`;
    }
    return html;
  }
}

module.exports = { WeatherHelper, HolidayHelper, DataHelper };
