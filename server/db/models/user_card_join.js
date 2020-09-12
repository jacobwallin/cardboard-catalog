const db = require("../db");
const { DataTypes } = require("sequelize");

const User_Card_Join = db.define("user_card_join", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = User_Card_Join;
