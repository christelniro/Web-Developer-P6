const express = require('express');

const mongoose = require('mongoose');




mongoose.connect(
    'mongodb+srv://niroc:Cn172617@cluster0.penuk.mongodb.net/project0?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();

app.use((req, res) => {
    res.json({ message: '' });
});


module.exports = mongoose;

module.exports = app;