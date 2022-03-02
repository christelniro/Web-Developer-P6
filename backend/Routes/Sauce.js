const express = require('express');

const router = express.Router();


const auth = require('../middleware/auth');


//Create and modify sauces
router.get('/', auth, saucesCtrl.getAllSauces);
router.post('/', auth, multer, saucesCtrl.createSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);


//Add and remove sauces review
router.post('/:id/like', auth, likesCtrl.addLikeOrDislike);

module.exports = router;