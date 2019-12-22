var bcrypt = require('bcryptjs');

const encrypt = function(plainString) {
    return bcrypt.hashSync(plainString, bcrypt.genSaltSync(10));
}

const validate = function(plainString, hashString) {
    return bcrypt.compareSync(plainString, hashString);
}

module.exports = {
    encrypt, 
    validate
}