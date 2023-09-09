const axios = require("axios");
const moment = require("moment");
const { HOLIDAY } = require("./constants");
const { HolidayHelper } = require("../helpers/helpers");

class HolidayService {
  static async getHolidays(apiKey, data, errors) {
    const day = moment().date();
    const month = moment().month() + 1;
    const year = moment().year();
    const options = {
      method: "get",
      url: `${HOLIDAY.BASE_URL}?&api_key=${apiKey}&country=US&year=${year}&day=${day}&month=${month}`,
    };

    console.info({
      service: "HolidayService",
      message: "Sending Holiday API Request",
      request: options,
    });

    try {
      const holidays = (await axios.request(options)).data;
      console.info({
        service: "HolidayService",
        message: "API response received",
      });

      data.holidays = HolidayHelper.prepareHolidays(holidays.response.holidays);
    } catch (err) {
      errors.holiday = err.message;
      console.error({
        service: "HolidayService",
        error: err.message,
      });
    }
  }
}

module.exports = HolidayService;
