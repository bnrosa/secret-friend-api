"use strict";
const nodemailer = require("nodemailer");
require('dotenv').config();
const gmail_host = process.env.GMAIL_HOST;
const gmail_port = process.env.GMAIL_PORT;
const gmail_user = process.env.GMAIL_USER;
const gmail_pass = process.env.GMAIL_PASS;

const transporter = nodemailer.createTransport({
    host: gmail_host,
    port: gmail_port,
    secure: false,
    auth: {
        user: gmail_user, // generated ethereal user
        pass: gmail_pass, // generated ethereal password
    },
    tls:{
        rejectUnauthorized: false
    }
});

module.exports = function sendEmails(users){
    users.forEach(user => {
        User.findById(user.friend)
            .then((friend) =>{
                transporter.sendMail({
                    from:`Seu amigo secreto ${gmail_user}`,
                    to: user.email,
                    subject: "Seu amigo secreto foi sorteado!",
                    text: `Seu amigo secreto é ${friend.name} de email ${friend.email}. Prometemos não contar para ninguém`
                  });
            });
    });
}