import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import DataTable from "react-data-table-component";
import columns from "./dataTableColumns";
import { TableDataPoint } from "../createTableData";
import { CollectionPageContainer, DataTableContainer } from "../../shared";
import StyledButton from "../../../Admin/components/StyledButton";
import AddCardsForm, { CardFormData } from "../../../add_cards_form/AddCardsForm";
import * as Styled from "../styled";
import sortCardNumbers from "../../../../utils/sortCardNumbers";

interface Props {
  tableData: any[];
}
export default function BrowseSubset(props: Props) {
  const subset = useSelector((state: RootState) => state.library.subsets.subset);

  const [selectedSeriesId, setSelectedSeriesId] = useState(subset.baseSeriesId || 1);
  // toggles showing checkboxes to select cards to add to collection
  const [checklistToggleSelect, setChecklistToggleSelect] = useState(false);
  // toggles add card form modal when user wants to add cards to collection
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [addCardFormData, setAddCardFormData] = useState<CardFormData[]>([]);

  function handleSeriesChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedSeriesId(+event.target.value);
  }

  useEffect(() => {
    if (!showAddCardForm) {
      setAddCardFormData([]);
    }
  }, [showAddCardForm]);

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
        card: {
          id: row.id,
          seriesId: row.seriesId,
          cardDataId: row.cardDataId,
          card_datum: row.cardData,
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
          <DataTableContainer>
            <DataTable
              dense
              title={
                <Styled.SelectParallel>
                  <Styled.SelectLabel>Select Parallel Set</Styled.SelectLabel>
                  <Styled.SeriesSelect value={selectedSeriesId} onChange={handleSeriesChange}>
                    <option value={0}>Show All Parallels</option>
                    {subset.series.map((series) => {
                      return (
                        <option key={series.id} value={series.id}>
                          {series.name}
                        </option>
                      );
                    })}
                  </Styled.SeriesSelect>
                </Styled.SelectParallel>
              }
              actions={
                <StyledButton
                  color={checklistToggleSelect ? "YELLOW" : "GRAY"}
                  height="25px"
                  width="100px"
                  fontSize="13px"
                  onClick={(e) => setChecklistToggleSelect(!checklistToggleSelect)}
                >
                  {checklistToggleSelect ? "Cancel" : "Add Cards"}
                </StyledButton>
              }
              columns={columns}
              data={props.tableData
                .filter((card: any) => {
                  return selectedSeriesId === 0 || card.seriesId === selectedSeriesId;
                })
                .sort((a, b) => {
                  return sortCardNumbers(a.cardData.number, b.cardData.number);
                })}
              highlightOnHover
              pagination
              paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
              paginationPerPage={20}
              selectableRows={checklistToggleSelect}
              onSelectedRowsChange={addSelectedCardsChange}
              customStyles={customStyles}
            />
          </DataTableContainer>
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
