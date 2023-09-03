const nodemailer = require("nodemailer");
const moment = require("moment");

class EmailService {
  static async sendEmail(emailFrom, password, emailTo, data) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailFrom,
        pass: password,
      },
    });

    const options = {
      from: emailFrom,
      to: emailTo,
      subject: `Daily Email Digest: ${moment().format("MMM D")}`,
      html: data,
    };

    transporter.sendMail(options, (err, info) => {
      if (err) console.error(err);
      else console.info(info);
    });
  }
}

module.exports = EmailService;
