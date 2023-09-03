const axios = require("axios");
const moment = require("moment");
const { HOLIDAY } = require("./constants");
const { HolidayHelper } = require("../helpers/helpers");

class HolidayService {
  static async getHolidays(apiKey) {
    const day = moment().date();
    const month = moment().month() + 1;
    const year = moment().year();
    const options = {
      method: "get",
      url: `${HOLIDAY.BASE_URL}?&api_key=${apiKey}&country=US&year=${year}&day=${day}&month=${month}`,
    };

    const data = (await axios.request(options)).data;
    return await HolidayHelper.prepareHolidays(data.response.holidays);
  }
}

module.exports = HolidayService;
