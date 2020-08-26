const db = require("../db");
const { DataTypes } = require("sequelize");

const Card = db.define("Card", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Card;
