import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import DataTable from "react-data-table-component";
import { columns } from "./dataTableColumns";
import dataTableConditionalStyles from "./dataTableConditionalStyles";
import { DataTableContainer } from "../../shared";
import PageContainer from "../../../shared/PageContainer";
import { NoDataMessage } from "../../../shared/NoDataMessage";
import * as SharedStyled from "../styled";
import * as Styled from "./styled";
import MedalIcon from "./medal.svg";
import { SeriesTableData } from "../createTableData";
import { TotalCards } from "../../shared";

interface Props {
  tableData: SeriesTableData;
  toggleDisableSeriesSelect(): void;
}
export default function CollectionSubset(props: Props) {
  const collectionFriend = useSelector(
    (state: RootState) => state.collection.browse.friend
  );

  const [showAllCards, setShowAllCards] = useState(false);

  function handleShowAllChange(event: React.ChangeEvent<HTMLInputElement>) {
    setShowAllCards(!showAllCards);
  }

  return (
    <PageContainer>
      <SharedStyled.PageTitle>
        {collectionFriend.id !== 0
          ? `${collectionFriend.username}'s Collection`
          : "My Collection"}
      </SharedStyled.PageTitle>
      <Styled.Collection>
        <Styled.CardsInCollection>
          {props.tableData.distinctCards > 0 &&
            props.tableData.distinctCards === props.tableData.cards.length && (
              <Styled.Svg>
                <img src={MedalIcon} alt="medal" />
              </Styled.Svg>
            )}
          <Styled.CardCount>
            <strong>{`${props.tableData.distinctCards}/${props.tableData.cards.length}`}</strong>
            &nbsp;Cards
          </Styled.CardCount>
        </Styled.CardsInCollection>
        <Styled.ProgressBar>
          <Styled.Progress
            percentage={
              props.tableData.cards.length === 0
                ? 0
                : (props.tableData.distinctCards /
                    props.tableData.cards.length) *
                  100
            }
          >
            {`${Number(
              (props.tableData.cards.length === 0
                ? 0
                : (props.tableData.distinctCards /
                    props.tableData.cards.length) *
                  100
              ).toFixed(1)
            )}%`}
          </Styled.Progress>
        </Styled.ProgressBar>
      </Styled.Collection>
      {props.tableData.distinctCards < props.tableData.cards.length && (
        <SharedStyled.ShowAllCards>
          <SharedStyled.SelectLabel>
            Show Missing Cards:
          </SharedStyled.SelectLabel>
          <input
            type="checkbox"
            onChange={handleShowAllChange}
            checked={showAllCards}
          />
        </SharedStyled.ShowAllCards>
      )}
      <SharedStyled.TableHeader>
        <SharedStyled.TableHeaderRow>
          <TotalCards totalCards={props.tableData.totalCards} />
        </SharedStyled.TableHeaderRow>
      </SharedStyled.TableHeader>

      <DataTableContainer>
        <DataTable
          noHeader
          dense
          columns={columns()}
          data={props.tableData.cards.filter((card) => {
            return showAllCards ? card.quantity === 0 : card.quantity > 0;
          })}
          highlightOnHover
          pagination
          paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
          paginationPerPage={20}
          conditionalRowStyles={dataTableConditionalStyles}
          noDataComponent={
            <NoDataMessage>
              There are no cards from this set in your collection.
            </NoDataMessage>
          }
        />
      </DataTableContainer>
    </PageContainer>
  );
}
