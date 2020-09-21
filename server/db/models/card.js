const db = require("../db");
const { DataTypes } = require("sequelize");

const Card = db.define("card", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

module.exports = Card;
