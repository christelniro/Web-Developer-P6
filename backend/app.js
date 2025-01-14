// import des modules npm - Ajout des plugins externes
const express = require('express');
// On importe mongoose pour pouvoir utiliser la base de données
const mongoose = require('mongoose');// Plugin Mongoose pour se connecter à la data base Mongo Db

// Création d'une application express
const app = express();

const path = require('path');


// enregistrons notre routeur dans notre application. Pour ce faire, importez le routeur 
const userRoutes = require('./Routes/user');
const sauceRoute = require('./Routes/Sauce');


// utilisation du module 'doten v' pour masquer les informations de connexion à la base de données à l'aide de variables d'environnement
require('dotenv').config();

// // Connection à la base de données MongoDB avec la sécurité vers le fichier .env pour cacher le mot de passe
// // L'un des avantages que nous avons à utiliser Mongoose pour gérer notre base de données MongoDB est que nous pouvons implémenter des schémas de données stricts
// // qui permettent de rendre notre application plus robuste
// mongoose.connect(
//     'mongodb+srv://niroc:Cn172617@cluster0.penuk.mongodb.net/project0?retryWrites=true&w=majority',
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() => console.log('Connexion à MongoDB réussie !'))
//     .catch(() => console.log('Connexion à MongoDB échouée !'));

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


// Middleware Header pour contourner les erreurs en débloquant certains systèmes de sécurité CORS, afin que tout le monde puisse faire des requetes depuis son navigateur
app.use((req, res, next) => {
    //     on indique que les ressources peuvent être partagées depuis n'importe quelle origine
    const allowedOrigins = ['http://localhost:8081', 'http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    //     on indique les méthodes autorisées pour les requêtes HTTP
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    //     on indique les entêtes qui seront utilisées après la pré-vérification cross-origin afin de donner l'autorisation
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //     on autorise ce serveur à fournir des scripts pour la page visitée
    res.setHeader('Content-Security-Policy', "default-src 'self'");

    return next();
});

app.use(express.json());

// Enregistrement des routeurs
// Va servir les routes dédiées aux utilisateur
app.use('/api/auth', userRoutes);
// Va servir les routes dédiées aux sauces
app.use('/api/sauces', sauceRoute);

//va servir les route lier utilisateur
app.use('/api/auth', userRoutes);


app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = mongoose;
// Export de l'application express pour déclaration dans server.js
module.exports = app;