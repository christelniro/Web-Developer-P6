// import des modules npm - Ajout des plugins externes
const express = require('express');
// On importe mongoose pour pouvoir utiliser la base de données
const mongoose = require('mongoose');// Plugin Mongoose pour se connecter à la data base Mongo Db
//importation du models
const Sauce = require('./models/sauce');
const User = require('./models/user');
// Création d'une application express
const app = express();

// Connection à la base de données MongoDB avec la sécurité vers le fichier .env pour cacher le mot de passe
// L'un des avantages que nous avons à utiliser Mongoose pour gérer notre base de données MongoDB est que nous pouvons implémenter des schémas de données stricts
// qui permettent de rendre notre application plus robuste
mongoose.connect(
    'mongodb+srv://niroc:Cn172617@cluster0.penuk.mongodb.net/project0?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));



app.use((req, res,) => {
    res.json({ message: 'test' });
});












module.exports = mongoose;
// Export de l'application express pour déclaration dans server.js
module.exports = app;