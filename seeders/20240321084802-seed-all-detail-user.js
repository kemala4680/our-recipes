'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const detail = require("../data/userdetail.json")
    .map((el, i) => {
      delete el.email;
      delete el.password;
      el.createdAt = el.updatedAt = new Date();
      el.reputation = Math.floor(Math.random() * 30) + 1;
      el.profilePicture = 'https://img.pikbest.com/png-images/20210821/cute-cat-chef-character-icon_6079120.png!sw800';
      el.description= '-';
      el.UserId = i + 1;
      return el;
    });
    await queryInterface.bulkInsert("UserDetails", detail);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("UserDetails");
  }
};
