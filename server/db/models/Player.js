const db = require("../db");
const { DataTypes } = require("sequelize");

const Player = db.define(
  "player",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
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
    url: {
      type: DataTypes.STRING,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["name", "birthday"],
      },
      {
        unique: true,
        fields: ["url"],
      },
    ],
  }
);

module.exports = Player;
