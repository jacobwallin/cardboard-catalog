import React, { useState, useEffect } from "react";
import {
  DeleteTableDataPoint,
  TableDataPoint,
} from "../../../Collection/subset-page/createTableData";
import { CardFormData } from "../AddCardsForm";
import DataTable from "react-data-table-component";
import { addColumns, removeColumns } from "./columns";

interface Props {
  addCardsChecklist?: TableDataPoint[];
  removeCardsChecklist?: DeleteTableDataPoint[];
  addCards(cards: CardFormData[]): void;
}

export default function ChecklistSelect(props: Props) {
  const [selectedCards, setSelectedCards] = useState<
    { card: TableDataPoint; qty: number }[]
  >([]);

  const [selectedCardsQty, setSelectedCardsQty] = useState(0);

  function changeSelectedCardQty(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedCards(
      selectedCards.map((card) => {
        if (card.card.id === +e.target.name) {
          // adjust total qty of cards to be added
          setSelectedCardsQty(selectedCardsQty - card.qty + +e.target.value);
          return {
            card: card.card,
            qty: +e.target.value,
          };
        }
        return card;
      })
    );
  }

  return (
    <>
      {props.addCardsChecklist && (
        <DataTable
          noHeader
          dense
          pagination
          selectableRows
          data={props.addCardsChecklist}
          columns={addColumns(selectedCards, changeSelectedCardQty)}
        />
      )}
      {props.removeCardsChecklist && (
        <DataTable
          noHeader
          dense
          pagination
          selectableRows
          data={props.removeCardsChecklist}
          columns={removeColumns()}
        />
      )}
    </>
  );
}
