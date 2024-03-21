const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(8);

const helper = {
  hashingPassword: (input) => {
    return bcrypt.hashSync(input, salt)
  },

  dateFormInput: (input) => {
    return input.toLocaleDateString('en-CA');
  },
  
  dateTemplate: (input) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return input.toLocaleDateString('id-ID', options);
  },

  created: (inputDate) => {
    const date = new Date();
    const timeDiff = inputDate.getTime() - date.getTime();
    let minute = Math.floor(timeDiff / 1000 / 60);
    minute = String(minute).slice(1);
    return (+minute < 60)? `${+minute} minutes ago`: (Math.floor(+minute/60) < 24)? `${Math.floor(+minute/60)} hours ago`: `${Math.floor((+minute/60)/24)} days ago`
  }
}

module.exports = helper;