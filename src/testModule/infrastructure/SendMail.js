"use strict";
require('dotenv').config();
const nodemailer = require("nodemailer");
const xoauth2 = require("xoauth2");

export default async function main() {
  //create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",

    //version I
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }

    //version II
    // auth: {
    //   xoauth2: xoauth2.createXOAuth2Generator({
    //       user: 'tereska.skrzypczyk@gmail.com', 
    //       clientId: process.env.ID,
    //       clientSecret: process.env.SECRET, 
    //       refreshToken: ""
    //   })
    // }
  });

  //send mail
  let info = await transporter.sendMail({
    //versionI
    from: '"Teresa" <coderscamp.2019@gmail.com>',
    //version II
    //from: '"Teresa Ziółkowska" <tereska.skrzypczyk@gmail.com>', 
    to: "coderscamp.2019@gmail.com", 
    subject: "Hello", 
    text: "Hello", 
    //html: "<b>Hello</b>" 
  });
}

//main().catch(console.error);
