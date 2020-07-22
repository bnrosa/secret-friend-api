const router = require('express').Router();
let User = require('../models/user.model');
const raffleSecretFriend = require('../services/raffle.service');
const sendEmails = require('../services/mailer.service');

router.route('/').post((req, res) => {
    //Get only emails
    let emails = req.body.map(user => user.email);
    
    //Query for users with these emails
    User.find().where({email: {"$in": emails}})
        .then(users =>{
            if(users.length < 2){
                res.status(400).json('Você não tem usuários suficientes');
            }
            else{
                const matchs = raffleSecretFriend(users);
                saveUsers(users, matchs)
                    .then((users) => {
                        sendEmails(users);
                        res.json('Sorteio realizado com sucesso!');
                    })
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

async function saveUsers(users, matchs){
    let saved;
    for(let i =0; i < users.length; i++){
        users[i].friend = matchs[users[i]._id];
        saved = await users[i].save();
    }

    return users;
}