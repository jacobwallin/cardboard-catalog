const db = require("../db");
const { DataTypes } = require("sequelize");

const Attribute = db.define("attribute", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Attribute;
