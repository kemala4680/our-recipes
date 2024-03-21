'use strict';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(8);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require("../data/user.json")
      .map((el) => {
        delete el.username;
        delete el.dateOfBirth;
        el.password = bcrypt.hashSync(el.password, salt);
        el.role = 'user';
        el.createdAt = el.updatedAt = new Date();
        return el;
      });
    await queryInterface.bulkInsert("Users", data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users");
  }
};
