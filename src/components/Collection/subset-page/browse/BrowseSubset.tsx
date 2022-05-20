import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { CardData } from "../../../../store/collection/browse/types";
import { addTransaction } from "../../../../store/collection/transactions/thunks";
import DataTable from "react-data-table-component";
import columns from "./dataTableColumns";
import { TableDataPoint } from "../createTableData";
import PageContainer from "../../../shared/PageContainer";
import StyledButton from "../../../Admin/components/StyledButton";
import AddCardsForm, {
  CardFormData,
} from "../../../transactions/select-cards-form/AddCardsForm";
import * as Styled from "../styled";
import { NoDataMessage } from "../../../shared/NoDataMessage";
import { TotalCards } from "../../shared";
import { SeriesTableData } from "../createTableData";
import { getDateString } from "../../../../utils/formatTimestamp";
import SubtleButton from "../../../shared/SubtleButton";

interface Props {
  tableData: SeriesTableData;
  toggleDisableSeriesSelect(): void;
}
export default function BrowseSubset(props: Props) {
  const dispatch = useDispatch();
  const userCardsInSubset = useSelector(
    (state: RootState) => state.collection.browse.cardsInSingleSubset.cards
  );
  const subset = useSelector((state: RootState) => state.library.subsets);
  const collectionFriend = useSelector(
    (state: RootState) => state.collection.browse.friend
  );

  // toggles showing checkboxes to select cards to add to collection
  const [checklistToggleSelect, setChecklistToggleSelect] = useState(false);
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

  // submit selected cards to be added to collection
  function submitAddCards(cardData: CardData[]) {
    dispatch(
      addTransaction(
        {
          type: "ADD",
          date: getDateString(new Date()),
          cardsAdded: cardData,
        },
        true
      )
    );
  }

  // handle form state for AddCardsForm component
  function setCardData(cardData: CardFormData[]) {
    setAddCardFormData(cardData);
  }

  function toggleCheckboxes() {
    setChecklistToggleSelect(!checklistToggleSelect);
    setClearSelected(!clearSelected);
    if (!clearSelected) {
      setSelectedCards([]);
    }
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

  function showForm() {
    const formData: CardFormData[] = selectedCards.reduce(
      (data: CardFormData[], card) => {
        const row = card.card;
        for (let i = 0; i < card.qty; i++) {
          data.push({
            id: row.id,
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
            qtyInCollection: userCardsInSubset.filter(
              (userCard) => userCard.cardId === row.id
            ).length,
            card: {
              id: row.id,
              seriesId: row.seriesId,
              cardDataId: row.cardDataId,
              card_datum: row.cardData,
              serializedTo: row.serializedTo,
              value: null,
              series: {
                ...row.series,
                subset: {
                  id: subset.id,
                  name: subset.name,
                  baseSeriesId: subset.baseSeriesId,
                  prefix: subset.prefix,
                  code: subset.code,
                  auto: subset.auto,
                  relic: subset.relic,
                  manufacturedRelic: subset.manufacturedRelic,
                  shortPrint: subset.shortPrint,
                  setId: subset.setId,
                  set: {
                    ...subset.set,
                  },
                },
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

    props.toggleDisableSeriesSelect();
  }

  function hideForm() {
    setShowAddCardForm(!showAddCardForm);
    setSelectedCards([]);
    props.toggleDisableSeriesSelect();
  }

  return (
    <PageContainer>
      {showAddCardForm && (
        <>
          <Styled.CloseButtonWrapper>
            <Styled.BackButton onClick={hideForm}>
              Return to Checklist
            </Styled.BackButton>
          </Styled.CloseButtonWrapper>
          <AddCardsForm
            selectFrom="NONE"
            cardData={addCardFormData}
            setCardData={setCardData}
            submit={submitAddCards}
            canEditSelectedCards={true}
            title="Add Cards to My Collection"
          />
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
              {collectionFriend.id === 0 && (
                <SubtleButton onClick={toggleCheckboxes}>
                  {checklistToggleSelect ? "Cancel" : "Add Cards"}
                </SubtleButton>
              )}
            </Styled.TableHeaderRow>
          </Styled.TableHeader>
          <DataTable
            noHeader
            dense
            columns={columns(
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
            clearSelectedRows={clearSelected}
            selectableRowsHighlight
            noDataComponent={
              <NoDataMessage>No cards belong to this set.</NoDataMessage>
            }
          />
        </>
      )}
    </PageContainer>
  );
}
