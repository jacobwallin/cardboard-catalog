import {
  DeleteTableDataPoint,
  TableDataPoint,
} from "../../../Collection/subset-page/createTableData";
import { UserCard } from "../../../../store/collection/browse/types";
import { CardFormData } from "../AddCardsForm";
import { Subset } from "../../../../store/library/subsets/types";
import { Set } from "../../../../store/library/sets/types";

// These functions convert TableDataPoint & DeleteTableDataPoint objects into CardFormData

export function createAddedCardFormData(
  card: TableDataPoint,
  userCards: UserCard[],
  subset: Subset,
  set: Set
): CardFormData {
  return {
    id: card.id,
    formData: {
      serialNumber: "",
      grade: "",
      gradingCompanyId: -1,
    },
    validation: {
      serialNumberError: false,
      gradeError: false,
      gradingCompanyError: false,
    },
    qtyInCollection: userCards.filter((userCard) => userCard.cardId === card.id)
      .length,
    card: {
      ...card,
      value: 0,
      card_datum: card.cardData,
      series: {
        ...card.series,
        subset: {
          id: subset.id,
          name: subset.name,
          baseSeriesId: subset.baseSeriesId,
          prefix: subset.prefix,
          code: subset.code,
          base: subset.base,
          auto: subset.auto,
          relic: subset.relic,
          manufacturedRelic: subset.manufacturedRelic,
          shortPrint: subset.shortPrint,
          setId: subset.setId,
          set: {
            id: set.id,
            name: set.name,
            year: set.year,
            leagueId: set.leagueId,
            brandId: set.brandId,
          },
        },
      },
    },
  };
}

export function createRemovedCardFormData(
  card: DeleteTableDataPoint,
  userCards: UserCard[],
  subset: Subset,
  set: Set
): CardFormData {
  return {
    // this id will be the UserCard id and not the actual card id since it is being selected from the user's collection
    id: card.id,
    formData: {
      serialNumber: card.serialNumber === null ? "" : String(card.serialNumber),
      grade: card.grade === null ? "" : String(card.grade),
      gradingCompanyId: card.gradingCompanyId || -1,
    },
    validation: {
      serialNumberError: false,
      gradeError: false,
      gradingCompanyError: false,
    },
    qtyInCollection: userCards.filter(
      (userCardy) => userCardy.cardId === card.card.id
    ).length,
    card: {
      ...card.card,
      value: 0,
      card_datum: card.card.cardData,
      series: {
        ...card.card.series,
        subset: {
          id: subset.id,
          name: subset.name,
          baseSeriesId: subset.baseSeriesId,
          prefix: subset.prefix,
          code: subset.code,
          base: subset.base,
          auto: subset.auto,
          relic: subset.relic,
          manufacturedRelic: subset.manufacturedRelic,
          shortPrint: subset.shortPrint,
          setId: subset.setId,
          set: {
            id: set.id,
            name: set.name,
            year: set.year,
            leagueId: set.leagueId,
            brandId: set.brandId,
          },
        },
      },
    },
  };
}
