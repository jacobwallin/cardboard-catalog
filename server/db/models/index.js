const Card = require("./Card");
const User = require("./User");
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
const CardDataPlayer = require("./CardDataPlayer");

const db = require("../db");

// many to many association between cards and usercards using custom through table (super many-to-many)
UserCard.belongsTo(User);
User.hasMany(UserCard);
UserCard.belongsTo(Card, {
  onDelete: "CASCADE",
});
Card.hasMany(UserCard, {
  onDelete: "CASCADE",
});
// prevent unique key from being created to allow the same card to be added to the same user multiple times
// User.belongsToMany(Card, { through: { model: UserCard, unique: false } });
// Card.belongsToMany(User, { through: { model: UserCard, unique: false } });

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

// many to many association between players and card data
Player.belongsToMany(CardData, { through: CardDataPlayer });
CardData.belongsToMany(Player, { through: CardDataPlayer });

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

Set.belongsTo(User, {
  as: "createdByUser",
  foreignKey: {
    name: "createdBy",
    allowNull: true,
  },
});
User.hasMany(Set, {
  foreignKey: {
    name: "createdBy",
  },
});
Set.belongsTo(User, {
  as: "updatedByUser",
  foreignKey: {
    name: "updatedBy",
    allowNull: true,
  },
});
User.hasMany(Set, {
  foreignKey: {
    name: "updatedBy",
  },
});

Subset.belongsTo(User, {
  as: "createdByUser",
  foreignKey: {
    name: "createdBy",
    allowNull: true,
  },
});
User.hasMany(Subset, {
  foreignKey: {
    name: "createdBy",
  },
});
Subset.belongsTo(User, {
  as: "updatedByUser",
  foreignKey: {
    name: "updatedBy",
    allowNull: true,
  },
});
User.hasMany(Subset, {
  foreignKey: {
    name: "updatedBy",
  },
});

Series.belongsTo(User, {
  as: "createdByUser",
  foreignKey: {
    name: "createdBy",
    allowNull: true,
  },
});
User.hasMany(Series, {
  foreignKey: {
    name: "createdBy",
  },
});
Series.belongsTo(User, {
  as: "updatedByUser",
  foreignKey: {
    name: "updatedBy",
    allowNull: true,
  },
});
User.hasMany(Series, {
  foreignKey: {
    name: "updatedBy",
  },
});

CardData.belongsTo(User, {
  as: "createdByUser",
  foreignKey: {
    name: "createdBy",
    allowNull: true,
  },
});
User.hasMany(CardData, {
  foreignKey: {
    name: "createdBy",
  },
});
CardData.belongsTo(User, {
  as: "updatedByUser",
  foreignKey: {
    name: "updatedBy",
    allowNull: true,
  },
});
User.hasMany(CardData, {
  foreignKey: {
    name: "updatedBy",
  },
});

Player.belongsTo(User, {
  as: "createdByUser",
  foreignKey: {
    name: "createdBy",
    allowNull: true,
  },
});
User.hasMany(Player, {
  foreignKey: {
    name: "createdBy",
  },
});
Player.belongsTo(User, {
  as: "updatedByUser",
  foreignKey: {
    name: "updatedBy",
    allowNull: true,
  },
});
User.hasMany(Player, {
  foreignKey: {
    name: "updatedBy",
  },
});

db.sync({ alter: true });

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
  CardDataPlayer,
};
