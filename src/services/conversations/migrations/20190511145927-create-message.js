'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sender_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' }
      },
      content: {
        type: Sequelize.STRING
      },
      is_file: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      conversation_id: {
        type: Sequelize.INTEGER,
        references: { model: 'conversations', key: 'id' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('messages');
  }
};