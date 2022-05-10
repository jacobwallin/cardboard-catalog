import React, { useState, useEffect } from "react";
import {
  DeleteTableDataPoint,
  TableDataPoint,
} from "../../../../Collection/subset-page/createTableData";
import { CardFormData } from "../../AddCardsForm";
import DataTable from "react-data-table-component";
import { addColumns, removeColumns } from "../columns";
import StyledButton from "../../../../Admin/components/StyledButton";
import * as Styled from "./styled";

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

  interface Selectable {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Array<TableDataPoint>;
  }

  function addSelectedCardsChange(stuff: Selectable) {
    let totalCards = 0;

    // set currectly selected cards and qty
    setSelectedCards(
      stuff.selectedRows.map((row) => {
        const currentlySelected = selectedCards.find(
          (card) => card.card.id === row.id
        );
        if (currentlySelected) {
          totalCards += currentlySelected.qty;
          return currentlySelected;
        }
        totalCards += 1;
        return {
          card: row,
          qty: 1,
        };
      })
    );

    // set total qty of selected cards
    setSelectedCardsQty(totalCards);
  }

  return (
    <>
      {props.addCardsChecklist && (
        <>
          <Styled.TableHeader>
            <StyledButton
              type="submit"
              color="BLUE"
              height="40px"
              width="65px"
              disabled={false}
            >
              Add
            </StyledButton>
          </Styled.TableHeader>
          <DataTable
            noHeader
            dense
            pagination
            data={props.addCardsChecklist}
            columns={addColumns(selectedCards, changeSelectedCardQty)}
            selectableRows
            onSelectedRowsChange={addSelectedCardsChange}
            // clearSelectedRows={clearSelected}
            selectableRowsHighlight
          />
        </>
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
