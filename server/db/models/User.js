const db = require("../db");
const crypto = require("crypto");

const { DataTypes, Sequelize } = require("sequelize");

const User = db.define(
  "user",
  {
    name: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username_lowercase: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        this.setDataValue("username_lowercase", value.toLowerCase());
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("email", value.toLowerCase());
      },
      validate: {
        isEmail: true,
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    password: {
      type: DataTypes.STRING,
      get() {
        return () => this.getDataValue("password");
      },
    },
    salt: {
      type: DataTypes.STRING,
      get() {
        return () => this.getDataValue("salt");
      },
    },
  },
  {
    indexes: [
      { unique: true, fields: ["username"] },
      { unique: true, fields: ["username_lowercase"] },
      { unique: true, fields: ["email"] },
      {
        unique: true,
        name: "unique_email",
        fields: [Sequelize.fn("lower", Sequelize.col("email"))],
      },
    ],
  }
);

User.prototype.verifyPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

User.generateSalt = function () {
  return crypto.randomBytes(16).toString("base64");
};

User.encryptPassword = function (password, salt) {
  return crypto
    .createHash("RSA-SHA256")
    .update(password)
    .update(salt)
    .digest("hex");
};

const setSaltAndPassword = (user) => {
  if (user.changed("password")) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate((users) => {
  users.forEach(setSaltAndPassword);
});

module.exports = User;
