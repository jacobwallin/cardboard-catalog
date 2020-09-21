const db = require("../db");
const { DataTypes } = require("sequelize");

const User_Card_Join = db.define(
  "user_card_join",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    serialNumber: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = User_Card_Join;
