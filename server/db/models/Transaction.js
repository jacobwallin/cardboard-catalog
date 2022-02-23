const db = require("../db");
const { DataTypes } = require("sequelize");

const Team = db.define("transaction", {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      customValidator: (value) => {
        const enums = ["QUICK", "TRADE", "SALE", "PURCHASE", "RIP"];
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
});

module.exports = Team;
