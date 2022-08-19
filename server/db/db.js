const Sequelize = require("sequelize");

const dbURL =
  process.env.HEROKU_POSTGRESQL_MAUVE_URL || "postgres://localhost:5432/cards";

const db = new Sequelize(dbURL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = db;
