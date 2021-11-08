const Sequelize = require("sequelize");

const dbURL =
  "postgres://bqqobezwecpmhg:6c7526a59c10d1efb71086e51f93a8428b4d6dcaddc7cca729502a69817f0306@ec2-3-217-91-165.compute-1.amazonaws.com:5432/d30vi3b56km00f";

const db = new Sequelize(dbURL, { native: true });

module.exports = db;
