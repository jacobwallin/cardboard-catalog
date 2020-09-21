const User = require("./User");
const Card = require("./Card");
const CardData = require("./CardData");
const UserCardJoin = require("./UserCardJoin");
const Set = require("./Set");
const Subset = require("./Subset");
const Series = require("./Series");
const League = require("./League");
const Brand = require("./Brand");
const Attribute = require("./Attribute");
const Team = require("./Team");

// many to many association between cards and attributes using custom through table
User.hasMany(UserCardJoin);
UserCardJoin.belongsTo(User);
Card.hasMany(UserCardJoin);
UserCardJoin.belongsTo(Card);
User.belongsToMany(Card, { through: UserCardJoin });
Card.belongsToMany(User, { through: UserCardJoin });

// One to many association between sets and subsets
Set.hasMany(Subset);
Subset.belongsTo(Set);

// One to many association between subsets and series
Subset.hasMany(Series);
Series.belongsTo(Subset);

// One to many association between series and cards
Series.hasMany(Card);
Card.belongsTo(Series);

// One to many association between cardData and cards
CardData.hasMany(Card);
Card.belongsTo(CardData);

// many to many association between cardRuns and cards
Series.belongsToMany(Attribute, { through: "series_attribute_join" });
Attribute.belongsToMany(Series, { through: "series_attribute_join" });

// One to many association between teams and cards
Team.hasMany(CardData);
CardData.belongsTo(Team);

// One to many association between leagues and teams
League.hasMany(Team);
Team.belongsTo(League);

// One to many association between leagues and sets
League.hasMany(Set);
Set.belongsTo(League);

// One to many association between brands and sets
Brand.hasMany(Set);
Set.belongsTo(Brand);

module.exports = {
  User,
  Card,
  CardData,
  UserCardJoin,
  Set,
  Subset,
  Series,
  League,
  Brand,
  Attribute,
  Team,
};
