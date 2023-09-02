const axios = require("axios");
const moment = require("moment");
const { HOLIDAY } = require("./constants");

class HolidayService {
  static async getHolidays(apiKey) {
    const day = moment().day();
    const month = moment().month();
    const year = moment().year();
    const options = {
      method: "get",
      url: `${HOLIDAY.BASE_URL}?&api_key=${apiKey}&country=US&year=${year}&day=${day}&month=${month}`,
    };

    const data = (await axios.request(options)).data;
    return data.response.holidays;
  }
}

module.exports = HolidayService;
