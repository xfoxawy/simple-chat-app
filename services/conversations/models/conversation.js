'use strict';
module.exports = (sequelize, DataTypes) => {
  const conversation = sequelize.define('conversation', {
    initiated_user: DataTypes.INTEGER,
    conversation_name: DataTypes.STRING
  }, {});
  conversation.associate = function(models) {
    // associations can be defined here
  };
  return conversation;
};