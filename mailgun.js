const mailgun = require("mailgun-js");
require('dotenv').config();
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});
const data = {
	from: "Mailgun Sandbox <postmaster@sandbox79d999baa29844bdbc54fcb15f87ece2.mailgun.org>",
	to: "bernardoorosa@gmail.com",
	subject: "Hello",
	text: "Testing some Mailgun awesomness!"
};

mg.messages().send(data, function (error, body) {
	console.log(body);
});