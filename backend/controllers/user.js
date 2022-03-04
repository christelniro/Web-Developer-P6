const User = require('../models/user');
// la fonction de hachage de bcrypt dans notre mot de passe et lui demandons de « saler » le mot de passe 10 fois.
const bcrypt = require('bcrypt');
const user = require('../models/user');


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
//une méthode permettant de vérifier si un utilisateur qui tente de se connecter dispose d'identifiants valides.
//r vérifier que l'e-mail entré par l'utilisateur correspond à un utilisateur existant de la base de données 
exports.login = (req, res, next) => {
    user.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                //s'ils ne correspondent pas, nous renvoyons une erreur 
                return res.status(401).json({ error: 'utilisateur non trouvé' });
            }
            //comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(500).json({ error: 'mot de passe incorrect!!' })
                    }
                    //les informations d'identification de notre utilisateur sont valides
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                }
                )
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};