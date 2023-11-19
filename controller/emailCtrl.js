const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "carloslorapuma@gmail.com",
      pass: "jcrmwqajawrckcod", //por cada 4 caracteres los separas si estas confundido con esta wbd
    },
  });


  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'hey 👻" <carloslorapuma@gmail.com>', // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL : %s", nodemailer.getTestMessageUrl(info));
});

module.exports = sendEmail;
