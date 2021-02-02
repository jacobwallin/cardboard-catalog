const db = require("../db");
const { DataTypes } = require("sequelize");

const UserCard = db.define(
  "user_card",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    serialNumber: {
      type: DataTypes.INTEGER,
    },
    grade: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = UserCard;
