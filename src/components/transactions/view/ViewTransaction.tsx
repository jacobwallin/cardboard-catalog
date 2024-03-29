import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../store";
import { fetchTransaction } from "../../../store/collection/transactions/thunks";
import PageContainer from "../../shared/PageContainer";
import DataTable from "react-data-table-component";
import dataFieldsByTransactionType from "../shared/dataFieldsByType";
import * as Styled from "./styled";
import { transactionTypeMap } from "../main/screateTableData";
import PageHeader from "../../shared/PageHeader";
import { convertDateString } from "../../../utils/formatTimestamp";
import { UserCardWithTransaction } from "../../../store/collection/transactions/types";
import columns from "./columns";
import { SelectedCardsTitle } from "../shared/SelectedCardsTitle";
import EditTransaction from "./edit/EditTransaction";
import SubtleButton from "../../shared/SubtleButton";

export default function ViewTransaction() {
  const dispatch = useDispatch();
  const { transactionId } = useParams<"transactionId">();

  const [cardsAdded, setCardsAdded] = useState<UserCardWithTransaction[]>([]);
  const [cardsRemoved, setCardsRemoved] = useState<UserCardWithTransaction[]>(
    []
  );
  const [editTransaction, setEditTransaction] = useState(false);

  const transaction = useSelector(
    (state: RootState) => state.collection.transactions.transaction
  );

  useEffect(() => {
    if (transactionId) dispatch(fetchTransaction(+transactionId));
  }, [transactionId, dispatch]);

  useEffect(() => {
    if (transaction.user_cards.length > 0) {
      setCardsAdded(
        transaction.user_cards.filter(
          (card) => !card.transaction_user_card.deleted
        )
      );
      setCardsRemoved(
        transaction.user_cards.filter(
          (card) => card.transaction_user_card.deleted
        )
      );
    }
  }, [transaction]);

  function toggleEdit() {
    setEditTransaction(!editTransaction);
  }

  if (!transactionId || +transactionId !== transaction.id) {
    return <h2>LOADING...</h2>;
  }
  return (
    <>
      <PageHeader
        title={editTransaction ? "Edit Transaction" : "View Transaction"}
      />
      <PageContainer>
        {editTransaction && (
          <EditTransaction transaction={transaction} cancel={toggleEdit} />
        )}
        {!editTransaction && (
          <>
            <Styled.DataContainer>
              <Styled.EditButton>
                <SubtleButton onClick={toggleEdit}>Edit</SubtleButton>
              </Styled.EditButton>
              <Styled.DataFieldContainer>
                <Styled.DataTitle>Type</Styled.DataTitle>
                <Styled.DataValue>
                  {transactionTypeMap[transaction.type]}
                </Styled.DataValue>
              </Styled.DataFieldContainer>
              <Styled.DataFieldContainer>
                <Styled.DataTitle>Date</Styled.DataTitle>
                <Styled.DataValue>
                  {convertDateString(transaction.date)}
                </Styled.DataValue>
              </Styled.DataFieldContainer>
              {dataFieldsByTransactionType[transaction.type].PLATFORM.shown &&
                transaction.platform && (
                  <Styled.DataFieldContainer>
                    <Styled.DataTitle>
                      {
                        dataFieldsByTransactionType[transaction.type].PLATFORM
                          .title
                      }
                    </Styled.DataTitle>
                    <Styled.DataValue>
                      {transaction.platform === null
                        ? "-"
                        : transaction.platform}
                    </Styled.DataValue>
                  </Styled.DataFieldContainer>
                )}
              {dataFieldsByTransactionType[transaction.type].INDIVIDUAL.shown &&
                transaction.individual && (
                  <Styled.DataFieldContainer>
                    <Styled.DataTitle>
                      {
                        dataFieldsByTransactionType[transaction.type].INDIVIDUAL
                          .title
                      }
                    </Styled.DataTitle>
                    <Styled.DataValue>
                      {transaction.individual === null
                        ? "-"
                        : transaction.individual}
                    </Styled.DataValue>
                  </Styled.DataFieldContainer>
                )}
              {dataFieldsByTransactionType[transaction.type].MONEY.shown &&
                transaction.money && (
                  <Styled.DataFieldContainer>
                    <Styled.DataTitle>
                      {
                        dataFieldsByTransactionType[transaction.type].MONEY
                          .title
                      }
                    </Styled.DataTitle>
                    <Styled.DataValue>
                      {transaction.money === null
                        ? "-"
                        : `$${transaction.money.toFixed(2)}`}
                    </Styled.DataValue>
                  </Styled.DataFieldContainer>
                )}

              {dataFieldsByTransactionType[transaction.type].NOTE.shown &&
                transaction.note && (
                  <Styled.DataFieldContainer>
                    <Styled.DataTitle>
                      {dataFieldsByTransactionType[transaction.type].NOTE.title}
                    </Styled.DataTitle>
                    <Styled.DataValue>
                      {transaction.note === null ? "-" : transaction.note}
                    </Styled.DataValue>
                  </Styled.DataFieldContainer>
                )}
            </Styled.DataContainer>
            {cardsAdded.length > 0 && (
              <>
                <Styled.CardTableHeader>
                  <Styled.PendingContainer>
                    <SelectedCardsTitle>Cards Added</SelectedCardsTitle>
                    {transaction.pending && (
                      <Styled.Pending>Pending</Styled.Pending>
                    )}
                  </Styled.PendingContainer>
                </Styled.CardTableHeader>
                <DataTable
                  dense
                  noHeader
                  columns={columns}
                  data={cardsAdded}
                  pagination
                  paginationRowsPerPageOptions={[10, 15, 20, 25, 50]}
                  paginationPerPage={transaction.type === "TRADE" ? 10 : 15}
                />
              </>
            )}
            {cardsRemoved.length > 0 && (
              <>
                <Styled.CardTableHeader>
                  <SelectedCardsTitle>Cards Removed</SelectedCardsTitle>
                </Styled.CardTableHeader>
                <DataTable
                  dense
                  noHeader
                  columns={columns}
                  data={cardsRemoved}
                  pagination
                  paginationRowsPerPageOptions={[10, 15, 20, 25, 50]}
                  paginationPerPage={transaction.type === "TRADE" ? 10 : 15}
                />
              </>
            )}
          </>
        )}
      </PageContainer>
    </>
  );
}
