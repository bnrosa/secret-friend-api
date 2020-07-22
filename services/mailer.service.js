const mailgun = require("mailgun-js");
require('dotenv').config();
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});
let User = require('../models/user.model');
const MG_LOGIN = process.env.MAILGUN_SMTP_LOGIN;

module.exports = function sendEmails(users){
    users.forEach(user => {
        User.findById(user.friend)
            .then((friend) =>{
                let data = {
                    from:`${MG_LOGIN}`,
                    to: user.email,
                    subject: "Seu amigo secreto foi sorteado!",
                    text: `Seu amigo secreto é ${friend.name} de email ${friend.email}. Prometemos não contar para ninguém`
                };
                
                mg.messages().send(data, function (error, body) {
                    console.log(body);
                });
                //console.log(friend);
            });
    });
}