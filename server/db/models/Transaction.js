const db = require("../db");
const { DataTypes } = require("sequelize");

const Team = db.define("transaction", {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      customValidator: (value) => {
        const enums = ["ADD", "DELETE", "TRADE", "SALE", "PURCHASE", "RIP"];
        if (!enums.includes(value)) {
          throw new Error("not a valid option");
        }
      },
    },
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
  },
  note: {
    type: DataTypes.TEXT,
  },
  platform: {
    type: DataTypes.STRING,
  },
  individual: {
    type: DataTypes.STRING,
  },
  money: {
    type: DataTypes.FLOAT,
  },
  pending: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  individual_id: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Team;
