require('dotenv').config();
const nodemailer = require("nodemailer");
const xoauth2 = require("xoauth2");

//version I
export default function main() {

  //create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 5000,
    secure: true,

    auth: {
      xoauth2: xoauth2.createXOAuth2Generator({
          type: 'OAuth2',
          user: 'coderscamp.2019@gmail.com', 
          clientId: process.env.ID,
          clientSecret: process.env.SECRET, 
          refreshToken: "1//04MKobbDoXj4TCgYIARAAGAQSNwF-L9IrWJTxMI8uYi-eP0T8N6i-Lpndt9YeW14dMuoieQxjQKJxWmZWUs0EXq3iK9rZd9ZflGM",
          accessToken: 'ya29.Il-1B6LByYGJkRmPAm2S8nyZx6lEzzohfy_NG5l0OLZWhhc7dNjcHox9NqffRTQtJ6Yq4vJRRM2OhTSusOjhA36xTqfPMboXcDrfgWJ7M2hMI4ZUxRiYNHqC28K-9Mb-uw'
      })
    }
  });

  console.log(transporter);

  //send mail with defined transport object
  let info = transporter.sendMail({
    from: '"Teresa" <coderscamp.2019@gmail.com>',
    to: "coderscamp.2019@gmail.com", 
    subject: "Hello in coders camp", 
    text: "Hello in coders camp",  
  });

  console.log(info);

}

//main().catch(console.error);

//version II
// export default function main() {
//   //create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 5000,
//     secure: true,

//     auth: {
//       xoauth2: xoauth2.createXOAuth2Generator({
//           type: 'OAuth2',
//           user: 'coderscamp.2019@gmail.com', 
//           clientId: process.env.ID,
//           clientSecret: process.env.SECRET, 
//           refreshToken: "1//04MKobbDoXj4TCgYIARAAGAQSNwF-L9IrWJTxMI8uYi-eP0T8N6i-Lpndt9YeW14dMuoieQxjQKJxWmZWUs0EXq3iK9rZd9ZflGM",
//           accessToken: 'ya29.Il-1B6LByYGJkRmPAm2S8nyZx6lEzzohfy_NG5l0OLZWhhc7dNjcHox9NqffRTQtJ6Yq4vJRRM2OhTSusOjhA36xTqfPMboXcDrfgWJ7M2hMI4ZUxRiYNHqC28K-9Mb-uw'
//       })
//     }
//   });

//   //send mail
//   let info = {
//     from: '"Teresa" <coderscamp.2019@gmail.com>',
//     to: "coderscamp.2019@gmail.com", 
//     subject: "Hello in coders cmap", 
//     text: "Hello in coders camp",  
//   };

//   transporter.sendMail(info, function (err, res) {
//     if(err){
//         console.log('Error');
//     } else {
//         console.log('Email Sent');
//     }
//   })
// }



