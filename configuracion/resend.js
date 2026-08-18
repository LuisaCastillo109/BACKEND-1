const { Resend } = require("resend");

const resend = new Resend(process.env.API_KEY);

module.exports = resend;