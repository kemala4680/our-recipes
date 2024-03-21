'use strict';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(8);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users");
  }
};
