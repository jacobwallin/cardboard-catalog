const db = require("../db");
const { DataTypes } = require("sequelize");

const Set = db.define("Set", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Set;
