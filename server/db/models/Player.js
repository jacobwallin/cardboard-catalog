const db = require("../db");
const { DataTypes } = require("sequelize");

const Player = db.define("player", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthday: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  hallOfFame: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Player;
