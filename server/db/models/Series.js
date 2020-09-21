const db = require("../db");
const { DataTypes } = require("sequelize");

const CardRun = db.define("series", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  serializedTo: {
    type: DataTypes.INTEGER,
  },
});

module.exports = CardRun;
