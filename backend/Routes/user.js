const express = require('express');

const router = express.Router();

// controleur pour assicier les différentes routes
const userCtrl = require('../controllers/user');

//permet d'envoyer des infos mail motpass au front
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/login', userCtrl.login);


module.exports = router;