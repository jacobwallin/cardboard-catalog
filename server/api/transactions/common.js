const {
  Transaction,
  UserCard,
  Card,
  CardData,
  Series,
  Subset,
  Team,
  GradingCompany,
  Set,
  Player,
} = require("../../db/models");

function getTransactionById(id, userId) {
  return Transaction.findByPk(id, {
    where: { userId: userId },
    include: {
      model: UserCard,
      paranoid: false,
      include: [
        {
          model: Card,
          attributes: {
            exclude: ["createdAt", "updatedAt", "updatedBy", "createdBy"],
          },
          include: [
            {
              model: CardData,
              attributes: {
                exclude: ["createdAt", "updatedAt", "updatedBy", "createdBy"],
              },
              include: [
                {
                  model: Team,
                  attributes: ["name"],
                },
                { model: Player },
              ],
            },
            {
              model: Series,
              attributes: {
                exclude: ["createdAt", "updatedAt", "updatedBy", "createdBy"],
              },
              include: {
                model: Subset,
                attributes: {
                  exclude: [
                    "createdAt",
                    "updatedAt",
                    "updatedBy",
                    "createdBy",
                    "description",
                  ],
                },
                include: {
                  model: Set,
                  attributes: {
                    exclude: [
                      "createdAt",
                      "updatedAt",
                      "updatedBy",
                      "createdBy",
                      "release_date",
                      "description",
                      "complete",
                    ],
                  },
                },
              },
            },
          ],
        },
        GradingCompany,
      ],
    },
  });
}

module.exports = { getTransactionById };
