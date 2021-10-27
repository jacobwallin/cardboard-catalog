import tableStyles from "../shared/dataTableStyles";
import { UserCard } from "../../../store/collection/filter/types";
import { IDataTableColumn } from "react-data-table-component";

function columns(selectedCols: {
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
      sortable: true,
      style: tableStyles,
      compact: true,
      minWidth: "auto",
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
      selector: (row: UserCard) => row.card.series.subset.set.name,
      cell: (row) => {
        let setName = getFullSetName(row);
        return setName;
      },
      sortFunction: (rowA, rowB) => {
        let setNameA = getFullSetName(rowA);
        let setNameB = getFullSetName(rowB);
        if (setNameA > setNameB) return -1;
        if (setNameA < setNameB) return 1;
        return 0;
      },
      sortable: true,
      style: tableStyles,
      compact: true,
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
