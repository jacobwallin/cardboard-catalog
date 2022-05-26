const db = require("../db");
const { DataTypes } = require("sequelize");

const Set = db.define("set", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  release_date: {
    type: DataTypes.DATEONLY,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  complete: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

module.exports = Set;
