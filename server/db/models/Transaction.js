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
  title: {
    type: DataTypes.STRING,
  },
  note: {
    type: DataTypes.TEXT,
  },
  date: {
    type: DataTypes.DATEONLY,
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
