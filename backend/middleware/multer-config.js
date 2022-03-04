// implémentation des téléchargements de fichiers pour que les utilisateurs puissent télécharger des images d'articles à vendre
const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    //indique à multer d'utiliser le nom d'origine,
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        // la constante dictionnaire de type MIME pour résoudre l'extension de fichier appropriée.
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

//Nous exportons ensuite l'élément multer entièrement configuré, lui passons notre constante storage et
// lui indiquons que nous gérerons uniquement les téléchargements de fichiers image.
module.exports = multer({ storage: storage }).single('image');