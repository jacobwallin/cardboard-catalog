import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../../store";
import { fetchSubset } from "../../../store/library/subsets/thunks";
import { fetchCardsInSingleSubset } from "../../../store/collection/browse/thunks";
import DataTable from "react-data-table-component";
import {
  CollectionPageContainer,
  DataTableContainer,
  ContentContainer,
} from "../shared";
import CollectionWrapper from "../../shared/CollectionWrapper";
import CollectionContainer from "../../shared/CollectionContainer";
import columns from "./dataTableColumns";
import createTableData from "./createTableData";
// import dataTableConditionalStyles from "./dataTableConditionalStyles";
import SubsetHeader from "../header/SubsetHeader";
import StyledButton from "../../Admin/components/StyledButton";
import ModalWindow from "../../Admin/components/modal/ModalWindow";
import Background from "../../shared/Background";
import { TableDataPoint } from "./createTableData";
import AddCardsForm, { CardFormData } from "../../add_cards_form/AddCardsForm";

import * as Styled from "./styled";

type Params = {
  year: string;
  setId: string;
  subsetId: string;
};

const SubsetPage = (props: RouteComponentProps<Params>) => {
  const dispatch = useDispatch();

  const librarySubset = useSelector(
    (state: RootState) => state.library.subsets.subset
  );

  const userCardsInSubset = useSelector(
    (state: RootState) => state.collection.browse.cardsInSingleSubset
  );

  const [showCollection, setShowCollection] = useState(false);
  const [selectedSeriesId, setSelectedSeriesId] = useState(0);
  const [showAllCards, setShowAllCards] = useState(false);
  // toggles showing checkboxes to select cards to add to collection
  const [checklistToggleSelect, setChecklistToggleSelect] = useState(false);
  // toggles add card form modal when user wants to add cards to collection
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [addCardFormData, setAddCardFormData] = useState<CardFormData[]>([]);

  const SUBSET_ID_PARAM = +props.match.params.subsetId;

  useEffect(() => {
    // get the complete subset data from the library api and all the user's cards that belong to the subset from the collection api
    dispatch(fetchSubset(SUBSET_ID_PARAM));
    dispatch(fetchCardsInSingleSubset(SUBSET_ID_PARAM));
  }, []);

  useEffect(() => {
    setSelectedSeriesId(librarySubset.baseSeriesId || 0);
  }, [librarySubset]);

  function handleSeriesChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedSeriesId(+event.target.value);
  }
  function handleShowAllChange(event: React.ChangeEvent<HTMLInputElement>) {
    setShowAllCards(!showAllCards);
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

  // TODO: DataTable wants a string[] ???
  const tableData: any = createTableData(librarySubset, userCardsInSubset);

  return (
    <CollectionWrapper>
      <CollectionContainer>
        {showAddCardForm && (
          <Background>
            <ModalWindow>
              <AddCardsForm formData={addCardFormData} />
              <StyledButton
                color="GRAY"
                height="25px"
                width="100px"
                fontSize="13px"
                onClick={(e) => setShowAddCardForm(!showAddCardForm)}
              >
                Close
              </StyledButton>
            </ModalWindow>
          </Background>
        )}
        <SubsetHeader
          title={librarySubset.name}
          handleBrowseClick={() => {}}
          handleCollectionClick={() => {}}
        />
        <CollectionPageContainer>
          <ContentContainer>
            {`Total Cards in Collection: ${userCardsInSubset.cards.length}`}{" "}
            <br />
            {`Unique Cards in Collection: ${
              Object.keys(
                userCardsInSubset.cards.reduce((uniqueCardsMap: any, card) => {
                  return { ...uniqueCardsMap, [card.cardId]: true };
                }, {})
              ).length
            }`}
          </ContentContainer>
          <Styled.CardFilterContainer>
            <Styled.SelectLabel>Show Missing Cards: </Styled.SelectLabel>
            <input
              type="checkbox"
              onChange={handleShowAllChange}
              checked={showAllCards}
            />
          </Styled.CardFilterContainer>
          <Styled.CardFilterContainer>
            <Styled.SelectLabel>Select Parallel Set: </Styled.SelectLabel>
            <Styled.SeriesSelect
              value={selectedSeriesId}
              onChange={handleSeriesChange}
            >
              <option value={0}>Show All Parallels</option>
              {librarySubset.series.map((series) => {
                return (
                  <option key={series.id} value={series.id}>
                    {series.name}
                  </option>
                );
              })}
            </Styled.SeriesSelect>
          </Styled.CardFilterContainer>
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
              title="Checklist"
              actions={
                <StyledButton
                  color={checklistToggleSelect ? "YELLOW" : "BLUE"}
                  height="25px"
                  width="100px"
                  fontSize="13px"
                  onClick={(e) =>
                    setChecklistToggleSelect(!checklistToggleSelect)
                  }
                >
                  {checklistToggleSelect ? "Cancel" : "Add Cards"}
                </StyledButton>
              }
              columns={columns}
              data={tableData.filter((card: any) => {
                return (
                  selectedSeriesId === 0 || card.seriesId === selectedSeriesId
                );
              })}
              highlightOnHover
              pagination
              paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
              paginationPerPage={20}
              defaultSortField={"Card #"}
              selectableRows={checklistToggleSelect}
              onSelectedRowsChange={addSelectedCardsChange}
            />
          </DataTableContainer>
        </CollectionPageContainer>
      </CollectionContainer>
    </CollectionWrapper>
  );
};

export default SubsetPage;
