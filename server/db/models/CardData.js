const db = require("../db");
const { DataTypes } = require("sequelize");

const CardData = db.define("card_data", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rookie: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "",
  },
});

module.exports = CardData;
