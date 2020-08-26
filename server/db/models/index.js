const Card = require("./card");
const Set = require("./set");
const Brand = require("./brand");
const Attribute = require("./attribute");
const Team = require("./team");

// many to many association between cards and attributes
Card.belongsToMany(Attribute, { through: "Attribute_Join" });

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
};
