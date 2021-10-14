import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import DataTable from "react-data-table-component";
import columns, { rowDisabledCriteria } from "./dataTableColumns";
import dataTableConditionalStyles from "./dataTableConditionalStyles";
import { TableDataPoint } from "../createTableData";
import {
  CollectionPageContainer,
  DataTableContainer,
  ContentContainer,
} from "../../shared";
import ModalWindow from "../../../Admin/components/modal/ModalWindow";
import Background from "../../../shared/Background";
import StyledButton from "../../../Admin/components/StyledButton";
import * as Styled from "../styled";

interface Props {
  tableData: any[];
}
export default function CollectionSubset(props: Props) {
  const subset = useSelector(
    (state: RootState) => state.library.subsets.subset
  );

  const [selectedSeriesId, setSelectedSeriesId] = useState(
    subset.baseSeriesId || 1
  );
  const [showAllCards, setShowAllCards] = useState(false);
  // toggles showing checkboxes to select cards to add to collection
  const [checklistToggleSelect, setChecklistToggleSelect] = useState(false);
  // toggles add card form modal when user wants to add cards to collection
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [selectedCardIds, setSelectedCardIds] = useState<
    { id: number; qty: number }[]
  >([]);

  function handleSeriesChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedSeriesId(+event.target.value);
  }

  interface Stuff {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Array<TableDataPoint>;
  }
  function addSelectedCardsChange(stuff: Stuff) {
    setSelectedCardIds(
      stuff.selectedRows.map((row) => {
        return {
          id: row.id,
          qty: row.quantity,
        };
      })
    );
  }

  function handleShowAllChange(event: React.ChangeEvent<HTMLInputElement>) {
    setShowAllCards(!showAllCards);
  }

  return (
    <CollectionPageContainer>
      {showAddCardForm && (
        <Background>
          <ModalWindow>
            <Styled.CloseButtonWrapper style={{ alignSelf: "center" }}>
              <StyledButton
                color="GRAY"
                height="25px"
                width="100px"
                fontSize="13px"
                onClick={(e) => setShowAddCardForm(!showAddCardForm)}
              >
                Close
              </StyledButton>
            </Styled.CloseButtonWrapper>
          </ModalWindow>
        </Background>
      )}

      <Styled.SelectParallel>
        <Styled.SelectLabel>Select Parallel Set: </Styled.SelectLabel>
        <Styled.SeriesSelect
          value={selectedSeriesId}
          onChange={handleSeriesChange}
        >
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
      <Styled.SelectParallel>
        <Styled.SelectLabel>Show Missing Cards: </Styled.SelectLabel>
        <input
          type="checkbox"
          onChange={handleShowAllChange}
          checked={showAllCards}
        />
      </Styled.SelectParallel>
      {selectedCardIds.length > 0 && (
        <Styled.AddCardsContainer>
          <Styled.AddCardsTotal>
            {`${selectedCardIds.reduce((total, card) => {
              return (total += card.qty);
            }, 0)} ${
              selectedCardIds.reduce((total, card) => {
                return (total += card.qty);
              }, 0) > 1
                ? "Cards"
                : "Card"
            } Ready to Delete`}
          </Styled.AddCardsTotal>
          <StyledButton
            color="RED"
            height="25px"
            width="100px"
            fontSize="13px"
            onClick={(e) => setShowAddCardForm(!showAddCardForm)}
          >
            Delete
          </StyledButton>
        </Styled.AddCardsContainer>
      )}
      <DataTableContainer>
        <DataTable
          dense
          title="Checklist"
          actions={
            <StyledButton
              color={checklistToggleSelect ? "YELLOW" : "GRAY"}
              height="25px"
              width="100px"
              fontSize="13px"
              onClick={(e) => setChecklistToggleSelect(!checklistToggleSelect)}
            >
              {checklistToggleSelect ? "Cancel" : "Delete Cards"}
            </StyledButton>
          }
          columns={columns}
          data={props.tableData
            .filter((card: any) => {
              return (
                selectedSeriesId === 0 || card.seriesId === selectedSeriesId
              );
            })
            .filter((card: any) => {
              return showAllCards || card.quantity > 0;
            })}
          conditionalRowStyles={dataTableConditionalStyles}
          highlightOnHover
          pagination
          paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
          paginationPerPage={20}
          defaultSortField={"Card #"}
          selectableRows={checklistToggleSelect}
          selectableRowDisabled={rowDisabledCriteria}
          onSelectedRowsChange={addSelectedCardsChange}
        />
      </DataTableContainer>
    </CollectionPageContainer>
  );
}
