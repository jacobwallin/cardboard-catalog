import React from "react";
import tableStyles from "../shared/dataTableStyles";
import { UserCard } from "../../../store/collection/filter/types";
import { IDataTableColumn } from "react-data-table-component";
import CardNumber from "../subset_page/CardNumber";

export function columns(selectedCols: {
  cardNumber: boolean;
  cardName: boolean;
  setName: boolean;
  dateAdded: boolean;
  team: boolean;
  players: boolean;
}): IDataTableColumn<UserCard>[] {
  const cols: IDataTableColumn<UserCard>[] = [];

  // CARD #
  if (selectedCols.cardNumber) {
    cols.push({
      name: "#",
      selector: (row: UserCard) => row.card.card_datum.number,
      cell: (row: UserCard) => (
        <CardNumber
          number={row.card.card_datum.number}
          serialized={row.card.series.serialized}
          shortPrint={row.card.series.shortPrint}
          auto={row.card.series.auto}
          relic={row.card.series.relic}
          manufacturedRelic={row.card.series.manufacturedRelic}
          refractor={row.card.series.refractor}
        />
      ),
      sortable: true,
      style: tableStyles,
      compact: true,
    });
  }

  // CARD NAME
  if (selectedCols.cardName) {
    cols.push({
      name: "Name",
      selector: (row: UserCard) => row.card.card_datum.name,
      sortable: true,
      style: tableStyles,
      compact: true,
    });
  }

  // TEAM
  if (selectedCols.team) {
    cols.push({
      name: "Team",
      selector: (row: UserCard) => row.card.card_datum.team.name,
      sortable: true,
      style: tableStyles,
      compact: true,
    });
  }

  // SET NAME
  if (selectedCols.setName) {
    cols.push({
      name: "Set",
      selector: (row: UserCard) => getFullSetName(row),
      sortable: true,
      style: tableStyles,
      compact: true,
      wrap: true,
      grow: 4,
    });
  }

  // DATE ADDED
  if (selectedCols.dateAdded) {
    cols.push({
      name: "Date Added",
      selector: (row: UserCard) => row.createdAt,
      cell: (row: UserCard) => row.createdAt.slice(0, 10),
      sortable: true,
      style: tableStyles,
      compact: true,
      grow: 0,
    });
  }

  return cols;
}

export function getFullSetName(row: UserCard): string {
  let fullName = row.card.series.subset.set.name;
  if (row.card.series.subset.id !== row.card.series.subset.set.baseSubsetId) {
    fullName = fullName.concat(" ", row.card.series.subset.name);
    if (row.card.series.id !== row.card.series.subset.baseSeriesId) {
      fullName = fullName.concat(" ", row.card.series.name);
    }
  }
  return fullName;
}

export default columns;
