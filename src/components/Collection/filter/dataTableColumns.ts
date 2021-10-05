import tableStyles from "../shared/dataTableStyles";
import { UserCard } from "../../../store/collection/filter/types";
import { TableColumns } from "./styled";
import { IDataTableColumn } from "react-data-table-component";

function columns(selectedCols: {
  cardNumber: boolean;
  cardName: boolean;
  setName: boolean;
  subsetName: boolean;
  dateAdded: boolean;
  team: boolean;
  players: boolean;
}): IDataTableColumn<UserCard>[] {
  const cols: IDataTableColumn<UserCard>[] = [];

  // CARD #
  if (selectedCols.cardNumber) {
    cols.push({
      name: "Card #",
      selector: (row: UserCard) => row.card.card_datum.number,
      sortable: true,
      style: tableStyles,
      compact: true,
      grow: 1,
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
      grow: 2,
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
      grow: 1,
    });
  }

  // SET NAME
  if (selectedCols.setName) {
    cols.push({
      name: "Set",
      selector: (row: UserCard) => row.card.series.subset.set.name,
      sortable: true,
      style: tableStyles,
      compact: true,
      grow: 2,
    });
  }

  // SUBSET NAME
  if (selectedCols.subsetName) {
    cols.push({
      name: "Subset",
      selector: (row: UserCard) => row.card.series.subset.name,
      sortable: true,
      style: tableStyles,
      compact: true,
      grow: 2,
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
      grow: 1,
    });
  }

  return cols;
}

export default columns;
