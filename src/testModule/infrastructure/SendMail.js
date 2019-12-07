"use strict";
require('dotenv').config();
const nodemailer = require("nodemailer");

export default async function main() {
  let testAccount = await nodemailer.createTestAccount();

  //create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.user, 
      pass: process.env.pass 
    }
  });

  //send mail
  let info = await transporter.sendMail({
    from: '"Teresa Ziółkowska" <coderscamp.2019@gmail.com>', 
    to: "coderscamp.2019@gmail.com", 
    subject: "Hello", 
    text: "Hello", 
    html: "<b>Hello</b>" 
  });

  console.log(info.messageId);
  console.log(nodemailer.getTestMessageUrl(info));
  
}

//main().catch(console.error);
