const db = require("../db");
const { DataTypes } = require("sequelize");

const Card = db.define("card", {
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
