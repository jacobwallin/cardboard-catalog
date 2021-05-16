const Sequelize = require("sequelize");

const dbURL = process.env.DATABASE_URL || "postgres://localhost:5432/cards";

const db = new Sequelize(dbURL, { native: true });

module.exports = db;
