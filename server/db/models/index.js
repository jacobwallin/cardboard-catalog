const User = require("./user");
const Card = require("./card");
const User_Card_Join = require("./user_card_join");
const Set = require("./set");
const Subset = require("./subset");
const League = require("./league");
const Brand = require("./brand");
const Attribute = require("./attribute");
const Team = require("./team");

// many to many association between cards and attributes using custom through table
User.belongsToMany(Card, { through: User_Card_Join });
Card.belongsToMany(User, { through: User_Card_Join });

// One to many association between sets and subsets
Set.hasMany(Subset);
Subset.belongsTo(Set);

// One to many association between subsets and cards
Subset.hasMany(Card);
Card.belongsTo(Subset);

// many to many association between users and cards
Subset.belongsToMany(Attribute, { through: "subset_attribute_join" });
Attribute.belongsToMany(Subset, { through: "subset_attribute_join" });

// One to many association between teams and cards
Team.hasMany(Card);
Card.belongsTo(Team);

// One to many association between brands and sets
Brand.hasMany(Set);
Set.belongsTo(Brand);

// One to many association between leagues and sets
League.hasMany(Set);
Set.belongsTo(League);

module.exports = {
  User,
  Card,
  User_Card_Join,
  Set,
  Subset,
  League,
  Brand,
  Attribute,
  Team,
};
