import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import DataTable from "react-data-table-component";
import columns from "./dataTableColumns";
import { TableDataPoint } from "../createTableData";
import { CollectionPageContainer } from "../../shared";
import StyledButton from "../../../Admin/components/StyledButton";
import AddCardsForm, {
  CardFormData,
} from "../../../add_cards_form/AddCardsForm";
import * as Styled from "../styled";
import { NoDataMessage } from "../../../shared/NoDataMessage";
import { TotalCards } from "../../shared";
import { SeriesTableData } from "../createTableData";
interface Props {
  tableData: SeriesTableData;
}
export default function BrowseSubset(props: Props) {
  const subset = useSelector((state: RootState) => state.library.subsets);
  const userCardsInSubset = useSelector(
    (state: RootState) => state.collection.browse.cardsInSingleSubset.cards
  );

  // toggles showing checkboxes to select cards to add to collection
  const [checklistToggleSelect, setChecklistToggleSelect] = useState(true);
  // toggles add card form modal when user wants to add cards to collection
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [clearSelected, setClearSelected] = useState(true);
  const [selectedCards, setSelectedCards] = useState<
    { card: TableDataPoint; qty: number }[]
  >([]);
  const [selectedCardsQty, setSelectedCardsQty] = useState(0);
  const [addCardFormData, setAddCardFormData] = useState<CardFormData[]>([]);

  useEffect(() => {
    if (!showAddCardForm) {
      setAddCardFormData([]);
    }
  }, [showAddCardForm]);

  function toggleCheckboxes() {
    setChecklistToggleSelect(!checklistToggleSelect);
    setClearSelected(!clearSelected);
  }

  interface Stuff {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Array<TableDataPoint>;
  }

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

  function addSelectedCardsChange(stuff: Stuff) {
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

  function rowSelectCritera(row: TableDataPoint) {
    return selectedCards.findIndex((card) => card.card.id === row.id) !== -1;
  }

  function showForm() {
    const formData: CardFormData[] = selectedCards.reduce(
      (data: CardFormData[], card) => {
        const row = card.card;
        for (let i = 0; i < card.qty; i++) {
          data.push({
            cardId: row.id,
            serialNumber: "",
            grade: "",
            gradingCompanyId: -1,
            serialNumberError: false,
            gradeError: false,
            gradingCompanyError: false,
            serialized: row.series.serialized,
            shortPrint: row.series.shortPrint,
            auto: row.series.auto,
            relic: row.series.relic,
            manufacturedRelic: row.series.manufacturedRelic,
            refractor: row.series.refractor,
            qtyInCollection: userCardsInSubset.filter(
              (userCard) => userCard.cardId === row.id
            ).length,
            card: {
              id: row.id,
              seriesId: row.seriesId,
              cardDataId: row.cardDataId,
              card_datum: row.cardData,
              serializedTo: null,
              value: null,
              createdBy: 0,
              updatedBy: 0,
              createdByUser: {
                username: "",
              },
              updatedByUser: {
                username: "",
              },
            },
          });
        }

        return data;
      },
      []
    );

    setAddCardFormData(formData);

    setShowAddCardForm(true);
  }

  function hideForm() {
    setShowAddCardForm(!showAddCardForm);
  }

  return (
    <CollectionPageContainer>
      {showAddCardForm && (
        <>
          <Styled.CloseButtonWrapper>
            <StyledButton
              color="GRAY"
              height="30px"
              width="175px"
              fontSize="13px"
              onClick={hideForm}
            >
              Return to Checklist
            </StyledButton>
          </Styled.CloseButtonWrapper>
          <AddCardsForm formData={addCardFormData} subsetId={subset.id} />
        </>
      )}
      {!showAddCardForm && (
        <>
          <Styled.PageTitle>Set Checklist</Styled.PageTitle>

          {selectedCards.length > 0 && (
            <Styled.AddCardsContainer>
              <Styled.AddCardsTotal>
                {`${selectedCardsQty} ${
                  selectedCardsQty > 1 ? "Cards" : "Card"
                } Ready to Add`}
              </Styled.AddCardsTotal>
              <StyledButton
                color="GREEN"
                height="25px"
                width="100px"
                fontSize="13px"
                onClick={showForm}
              >
                Add
              </StyledButton>
            </Styled.AddCardsContainer>
          )}
          <Styled.TableHeader>
            <Styled.TableHeaderRow>
              <TotalCards totalCards={props.tableData.cards.length} />
              <StyledButton
                color={checklistToggleSelect ? "YELLOW" : "GRAY"}
                height="25px"
                width="100px"
                fontSize="13px"
                onClick={toggleCheckboxes}
              >
                {checklistToggleSelect ? "Cancel" : "Add Cards"}
              </StyledButton>
            </Styled.TableHeaderRow>
          </Styled.TableHeader>
          <DataTable
            noHeader
            dense
            columns={columns(
              props.tableData.seriesId === subset.baseSeriesId,
              !checklistToggleSelect,
              selectedCards,
              changeSelectedCardQty
            )}
            data={props.tableData.cards}
            highlightOnHover
            pagination
            paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
            paginationPerPage={20}
            selectableRows={checklistToggleSelect}
            onSelectedRowsChange={addSelectedCardsChange}
            selectableRowSelected={rowSelectCritera}
            clearSelectedRows={clearSelected}
            selectableRowsHighlight
            customStyles={customStyles}
            noDataComponent={
              <NoDataMessage>No cards belong to this set.</NoDataMessage>
            }
          />
        </>
      )}
    </CollectionPageContainer>
  );
}

var customStyles = {
  // rows: {
  //     style: {
  //         minHeight: '72px', // override the row height
  //     },
  // },
  rows: {
    style: {
      fontSize: "12px",
      // color: "red",
    },
    // denseStyle: {
    //   minHeight: "25px",
    // },
  },
  subHeader: {
    style: {
      minHeight: "40px",
    },
  },
  headCells: {
    style: {
      paddingLeft: "5px", // override the cell padding for head cells
      paddingRight: "5px",
    },
  },
  cells: {
    style: {
      paddingLeft: "5px", // override the cell padding for data cells
      paddingRight: "5px",
      minWidth: "auto",
    },
  },
  header: {
    style: {
      fontSize: "20px",
      minHeight: "45px",
    },
  },
};
