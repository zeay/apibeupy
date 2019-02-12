"use strict"
const nodeMailer = require('nodemailer');

const mailerFunction = {};

let mailer = {
    service: 'Gmail',
    auth: {
        user: 'apibeupy@gmail.com',
        pass: 'guess@007'
    }
};
let transporter = nodeMailer.createTransport(mailer);

mailerFunction.newsletter = function (data, cb){
    let template = require('./emailContent.js');
    let mailOptions = {
        from: 'Beupy Api Service',
        to: data.email,
        subject: "Beupy api newsletter notification service",
        html: template(data)
    };

    transporter.sendMail(mailOptions, function(error){
        if(error){
            console.log(error);
            cb(true);
        }else{
            console.log("Email Send");
            cb(false);
        }
            
      });
}

mailerFunction.sendMessage = function(data,cb){
    let template = require('./messageContent.js');
    let mailOptions = {
        from: 'Beupy Api Service',
        to: data.email,
        subject: "Beupy api message service",
        html: template(data)
    };

    transporter.sendMail(mailOptions, (err)=>{
        if(err){
            console.log(err);
            cb(true);
        }else{
            console.log("Message send");
            cb(false);
        }
    });
}




module.exports = mailerFunction;