const db = require("../db");
const { DataTypes } = require("sequelize");

const Team = db.define("team", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Team;
