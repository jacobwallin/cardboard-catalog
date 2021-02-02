const User = require("./User");
const Card = require("./Card");
const CardData = require("./CardData");
const UserCard = require("./UserCard");
const Set = require("./Set");
const Subset = require("./Subset");
const Series = require("./Series");
const League = require("./League");
const Brand = require("./Brand");
const Team = require("./Team");
const Player = require("./Player");
const GradingCompany = require("./GradingCompany");

// many to many association between cards and usercards using custom through table (super many-to-many)
UserCard.belongsTo(User);
User.hasMany(UserCard);
UserCard.belongsTo(Card);
Card.hasMany(UserCard);
User.belongsToMany(Card, { through: UserCard });
Card.belongsToMany(User, { through: UserCard });

// One to many association between sets and subsets
Subset.belongsTo(Set, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
Set.hasMany(Subset);

// One to many association between subsets and series
Series.belongsTo(Subset, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
Subset.hasMany(Series);

// One to many association between series and cards
Card.belongsTo(Series, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
Series.hasMany(Card);

// One to many association between cardData and cards
Card.belongsTo(CardData, {
  foreignKey: {
    name: "cardDataId",
    allowNull: false,
  },
  onDelete: "CASCADE",
});
CardData.hasMany(Card, {
  foreignKey: {
    name: "cardDataId",
    allowNull: false,
  },
});

// one to many between grading company and user card join
UserCard.belongsTo(GradingCompany);
GradingCompany.hasMany(UserCard);

// One to many association between players and card data
CardData.belongsTo(Player);
Player.hasMany(CardData);

// One to many association between subsets and card data
CardData.belongsTo(Subset, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
Subset.hasMany(CardData);

// One to many association between teams and cards
CardData.belongsTo(Team);
Team.hasMany(CardData);

// One to many association between leagues and teams
Team.belongsTo(League, {
  foreignKey: {
    allowNull: false,
  },
});
League.hasMany(Team);

// One to many association between leagues and sets
Set.belongsTo(League, {
  foreignKey: {
    allowNull: false,
  },
});
League.hasMany(Set);

// One to many association between brands and sets
Set.belongsTo(Brand, {
  foreignKey: {
    allowNull: false,
  },
});
Brand.hasMany(Set);

module.exports = {
  User,
  Card,
  CardData,
  UserCard,
  Set,
  Subset,
  Series,
  League,
  Brand,
  Team,
  Player,
  GradingCompany,
};
