const db = require("../db");
const { DataTypes } = require("sequelize");

const Attribute = db.define("Attribute", {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Attribute;
