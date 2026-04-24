'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addConstraint('airports', {
      type: 'FOREIGN KEY',
      name: 'city_fkey_constraint',
      fields: ['cityId'],
      references: {
        table: 'cities',
        field: 'id'
      },
      onDelete: 'CASCADE'
    })

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
      await queryInterface.removeConstraint('airports', 'city_fkey_constraint');
  }
};
