const User = require('../models/user');
// la fonction de hachage de bcrypt dans notre mot de passe et lui demandons de « saler » le mot de passe 10 fois.
const bcrypt = require('bcrypt');


exports.signup = (req, res, next) => {
    //haché le motde passe
    bcrypt.hash(req.body.password, 10)
        //un utilisateur et l'enregistrons dans la base de données, en renvoyant une réponse de réussite en cas de succès,
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'utilisateur créé' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {

};