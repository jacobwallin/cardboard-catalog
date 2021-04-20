const db = require("../db");
const { DataTypes } = require("sequelize");

const League = db.define("league", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = League;
