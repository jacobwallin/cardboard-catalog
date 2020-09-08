const Card = require("./card");
const Set = require("./set");
const Brand = require("./brand");
const Attribute = require("./attribute");
const Team = require("./team");
const User = require("./user");

// many to many association between cards and attributes
Card.belongsToMany(Attribute, { through: "Card_Attribute_Join" });

// many to many association between users and cards
User.belongsToMany(Card, { through: "User_Card_Join" });

// One to many association between teams and cards
Team.hasMany(Card);
Card.belongsTo(Team);

// One to many association between sets and cards
Set.hasMany(Card);
Card.belongsTo(Set);

// One to many association between brands and sets
Brand.hasMany(Set);
Set.belongsTo(Brand);

module.exports = {
  Card,
  Set,
  Brand,
  Attribute,
  Team,
  User,
};
