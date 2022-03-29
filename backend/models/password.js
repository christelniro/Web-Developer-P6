let passwordValidator = require('password-validator');

// Creer un shécma
let passwordSchema = new passwordValidator();


// Add properties to it

passwordSchema
    .is().min(10)
    .is().max(64)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces()


module.exports = passwordSchema;
