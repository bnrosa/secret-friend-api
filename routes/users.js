const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) =>{
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) =>{
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) =>{
    User.findByIdAndDelete(req.params.id)
        .then(user => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) =>{
    User.findById(req.params.id)
        .then(user => {
            user.name = req.body.name;
            user.email = req.body.email;

            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: '+ err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email
    });
    newUser.save()
        .then(() => res.json('User added'))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;