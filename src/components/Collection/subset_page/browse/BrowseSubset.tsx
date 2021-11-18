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
import sortSeries from "../sortSeries";
import { NoDataMessage } from "../../../shared/NoDataMessage";
import { TotalCards } from "../../shared";

interface Props {
  tableData: any[];
}
export default function BrowseSubset(props: Props) {
  const subset = useSelector((state: RootState) => state.library.subsets);
  const userCardsInSubset = useSelector(
    (state: RootState) => state.collection.browse.cardsInSingleSubset.cards
  );

  const [selectedSeriesId, setSelectedSeriesId] = useState(
    subset.baseSeriesId || 1
  );
  // toggles showing checkboxes to select cards to add to collection
  const [checklistToggleSelect, setChecklistToggleSelect] = useState(false);
  // toggles add card form modal when user wants to add cards to collection
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [clearSelected, setClearSelected] = useState(true);
  const [addCardFormData, setAddCardFormData] = useState<CardFormData[]>([]);

  function handleSeriesChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedSeriesId(+event.target.value);
  }

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
  function addSelectedCardsChange(stuff: Stuff) {
    const formData: CardFormData[] = stuff.selectedRows.map((row) => {
      return {
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
      };
    });
    setAddCardFormData(formData);
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
              onClick={(e) => setShowAddCardForm(!showAddCardForm)}
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
          {subset.series.length > 1 && (
            <Styled.SelectParallel>
              <Styled.SelectLabel>Select Parallel Set</Styled.SelectLabel>
              <Styled.SeriesSelect
                value={selectedSeriesId}
                onChange={handleSeriesChange}
                disabled={checklistToggleSelect}
              >
                {subset.series
                  .sort((a, b) => {
                    return sortSeries(a, b, subset.baseSeriesId || 0);
                  })
                  .map((series) => {
                    return (
                      <option key={series.id} value={series.id}>
                        {series.name}
                        {series.serialized && ` /${series.serialized}`}
                      </option>
                    );
                  })}
              </Styled.SeriesSelect>
            </Styled.SelectParallel>
          )}
          {addCardFormData.length > 0 && (
            <Styled.AddCardsContainer>
              <Styled.AddCardsTotal>
                {`${addCardFormData.length} ${
                  addCardFormData.length > 1 ? "Cards" : "Card"
                } Ready to Add`}
              </Styled.AddCardsTotal>
              <StyledButton
                color="GREEN"
                height="25px"
                width="100px"
                fontSize="13px"
                onClick={(e) => setShowAddCardForm(!showAddCardForm)}
              >
                Add
              </StyledButton>
            </Styled.AddCardsContainer>
          )}
          <Styled.TableHeader>
            <TotalCards
              totalCards={
                props.tableData.find(
                  (series) => series.seriesId === selectedSeriesId
                ).cards.length
              }
            />
            <StyledButton
              color={checklistToggleSelect ? "YELLOW" : "GRAY"}
              height="25px"
              width="100px"
              fontSize="13px"
              onClick={toggleCheckboxes}
            >
              {checklistToggleSelect ? "Cancel" : "Add Cards"}
            </StyledButton>
          </Styled.TableHeader>
          <DataTable
            noHeader
            dense
            columns={columns(selectedSeriesId === subset.baseSeriesId)}
            data={
              props.tableData.find(
                (series) => series.seriesId === selectedSeriesId
              ).cards
            }
            highlightOnHover
            pagination
            paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
            paginationPerPage={20}
            selectableRows={checklistToggleSelect}
            onSelectedRowsChange={addSelectedCardsChange}
            clearSelectedRows={clearSelected}
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
