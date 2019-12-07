"use strict";
//require('dotenv').config();
const nodemailer = require("nodemailer");
const xoauth2 = require("xoauth2");

export default async function main() {
  //create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      xoauth2: xoauth2.createXOAuth2Generator({
          user: 'tereska.skrzypczyk@gmail.com', 
          clientId: "",
          clientSecret: "", 
          refreshToken: ""
      })
    }
  });

  //send mail
  let info = await transporter.sendMail({
    from: '"Teresa Ziółkowska" <tereska.skrzypczyk@gmail.com>', 
    to: "coderscamp.2019@gmail.com", 
    subject: "Hello", 
    text: "Hello", 
    //html: "<b>Hello</b>" 
  });
}

//main().catch(console.error);
