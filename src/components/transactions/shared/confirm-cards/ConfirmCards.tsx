import React from "react";
import styled from "styled-components";
import { CardFormData } from "../../select-cards-form/AddCardsForm";
import DataTable from "react-data-table-component";
import CardTableHeader from "../../shared/CardTableHeader";
import { SelectedCardsTitle } from "../../shared/SelectedCardsTitle";
import columns from "./columns";

const Container = styled.div`
  width: 100%;
  margin-top: 25px;
`;

interface Props {
  cardsAdded?: CardFormData[];
  addedTitle?: string;
  cardsRemoved?: CardFormData[];
  removedTitle?: string;
}

export default function ConfirmCards(props: Props) {
  return (
    <Container>
      {props.cardsAdded && props.cardsAdded.length > 0 && (
        <>
          <CardTableHeader>
            <SelectedCardsTitle>
              {props.addedTitle || "Cards Added"}
            </SelectedCardsTitle>
          </CardTableHeader>
          <DataTable
            noHeader
            dense
            pagination
            columns={columns}
            data={props.cardsAdded}
          />
        </>
      )}
      {props.cardsRemoved && props.cardsRemoved.length > 0 && (
        <>
          <CardTableHeader>
            <SelectedCardsTitle>
              {props.removedTitle || "Cards Removed"}
            </SelectedCardsTitle>
          </CardTableHeader>
          <DataTable
            noHeader
            dense
            pagination
            columns={columns}
            data={props.cardsRemoved}
          />
        </>
      )}
    </Container>
  );
}
