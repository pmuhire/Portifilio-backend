const nodemailer=require("nodemailer");
require("dotenv").config();

exports.mailer=(from,subject,message)=>{
    let smtpTransport=nodemailer.createTransport(smtpTransport({
        service:"gmail",
        host:"smtp.gmail.com",
        auth:{
            user: process.env.email,
            pass: process.env.secret
        }
    }))
    let mailOptions={
        from:from,
        to:process.env.email,
        subject:subject,
        Text:message
    }
    smtpTransport.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }else{
            console.log("Email sent: "+info.response);
        }
    })
}