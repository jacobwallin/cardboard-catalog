import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import {
  DeleteTableDataPoint,
  TableDataPoint,
} from "../../../../Collection/subset-page/createTableData";
import { CardFormData } from "../../AddCardsForm";
import DataTable from "react-data-table-component";
import { addColumns, removeColumns } from "./columns";
import StyledButton from "../../../../Admin/components/StyledButton";
import * as Styled from "./styled";
import {
  createRemovedCardFormData,
  createAddedCardFormData,
} from "../createFormData";
import sortCardNumbers from "../../../../../utils/sortCardNumbers";

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
  const [clearSelected, setClearSelected] = useState(false);

  const set = useSelector((state: RootState) => state.library.sets.set);
  const subset = useSelector((state: RootState) => state.library.subsets);
  const userSubsetCards = useSelector(
    (state: RootState) => state.collection.browse.cardsInSingleSubset.cards
  );

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

  function addSelectedCardsChange(selectable: Selectable) {
    let totalCards = 0;

    setSelectedCards(
      selectable.selectedRows.map((row) => {
        // persist qty selected and correctly calculate total cards
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

  function handleAddCards() {
    let cardsToAdd: CardFormData[] = [];
    for (let i = 0; i < selectedCards.length; i++) {
      for (let j = 0; j < selectedCards[i].qty; j++) {
        cardsToAdd.push(
          createAddedCardFormData(
            selectedCards[i].card,
            userSubsetCards,
            subset,
            set
          )
        );
      }
    }

    props.addCards(
      cardsToAdd.sort((a, b) =>
        sortCardNumbers(a.card.card_datum.number, b.card.card_datum.number)
      )
    );

    // clear DataTable selected state and selected cards
    setClearSelected(true);
    setSelectedCards([]);
  }

  // immediately toggle clearSelected back to false to allow more cards to be selected after clicking add
  useEffect(() => {
    if (clearSelected) {
      setClearSelected(false);
    }
  }, [clearSelected]);

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
              onClick={handleAddCards}
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
            clearSelectedRows={clearSelected}
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
