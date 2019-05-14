'use strict';
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    sender_id: DataTypes.INTEGER,
    content: DataTypes.STRING,
    is_file: DataTypes.BOOLEAN,
    conversation_id: DataTypes.INTEGER
  }, {});
  message.associate = function(models) {
    // associations can be defined here
  };
  return message;
};