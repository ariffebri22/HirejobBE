const nodemailer = require("nodemailer")

let transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_PASS,
    },
  });

module.exports = (email_client,url,name) => {
   let mailOption = {
    from: process.env.EMAIL_NAME,
    to: email_client,
    subject: `Recipe activated email for ${name}`,
    text: `Hallo ${name}, this is your link for activated account, link ${url}`
   } 
   transporter.sendMail(mailOption,function(err,data){
    if(err){
        console.log(`err`,err)
        return err
    } else {
        console.log(`email send`,data)
        return data
    }
   })
}