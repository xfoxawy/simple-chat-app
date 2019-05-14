'use strict';
module.exports = (sequelize, DataTypes) => {
  const conversation_user = sequelize.define('conversation_user', {
    conversation_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  conversation_user.associate = function(models) {
  };
  return conversation_user;
};