const db = require("../db");
const { DataTypes } = require("sequelize");

const CardData = db.define("card_data", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rookie: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = CardData;
