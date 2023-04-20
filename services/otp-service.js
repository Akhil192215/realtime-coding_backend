const crypto = require("crypto");
const hashService = require("./hash-service");
const express = require("express");
const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH;
const client = require("twilio")(
  "AC46eff7fd9bb02eeb887104d7bae12e32",
  "3002e05dde6e4f6c993d1bba100d9c47",
  {
    lazyLoading: true,
  }
);

class OtpService {
  async generateOtp() {
    const otp = await crypto.randomInt(1000, 9999);
    return otp;
  }

  async sendBySms(phone, otp) {
    const toNumber = phone; // The phone number to send the OTP to

    client.messages
      .create({
        body: `Your OTP is: ${otp}`,
        from: "+15077103858", // Your Twilio phone number
        to: toNumber,
      })
      .then((message) => console.log(message.sid))
      .catch((error) => console.log(error));
  }

  verifyOtpService(hashedOtp, data) {
    const computeHash = hashService.hashOtp(data);
    return computeHash === hashedOtp;
  }
}

module.exports = new OtpService();
