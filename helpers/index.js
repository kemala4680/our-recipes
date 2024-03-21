const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(8);

const helper = {
  hashingPassword: (input) => {
    return bcrypt.hashSync(input, salt)
  }
}

module.exports = helper;