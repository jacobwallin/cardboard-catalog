import React from "react";
import styled from "styled-components";
import Background from "../../shared/Background";
import ModalWindow from "../../Admin/components/modal/ModalWindow";
import StyledButton from "../../Admin/components/StyledButton";
import ModalHeader from "../../Admin/components/modal/ModalHeader";
import { LoadingDots } from "../../shared/Loading";

const Wrapper = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PdfTitle = styled.input`
  height: 30px;
  width: 250px;
  margin: 20px 0 20px 0;
`;

const Padding = styled.div`
  height: 20px;
`;

const LoadingMessage = styled.div``;

const SortByContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  align-self: flex-start;
  margin-bottom: 20px;
`;

const RadioLabel = styled.label`
  font-size: 0.8rem;
`;

const RadioTitle = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
`;

interface Props {
  createdPdf(): void;
  dismiss(): void;
  handleChanges(e: React.ChangeEvent<HTMLInputElement>): void;
  loading: boolean;
  loadingMessage: string;
  sortDirection: string;
  sortBy: string;
}

export default function PdfModal(props: Props) {
  return (
    <Background>
      <ModalWindow>
        <ModalHeader
          title="Download PDF Checklist"
          handleClose={props.dismiss}
        />
        <Wrapper>
          {props.loading ? (
            <>
              <LoadingDots />
              <LoadingMessage>{props.loadingMessage}</LoadingMessage>
            </>
          ) : (
            <>
              <PdfTitle
                type="text"
                id="title"
                placeholder="Enter PDF Title"
                onChange={props.handleChanges}
              />
              <SortByContainer>
                <RadioTitle>Sort By</RadioTitle>
                <div>
                  <input
                    type="radio"
                    id="number"
                    name="sortBy"
                    checked={props.sortBy === "number"}
                    onChange={props.handleChanges}
                  />
                  <RadioLabel htmlFor="number">Number</RadioLabel>
                </div>
                <div>
                  <input
                    type="radio"
                    id="name"
                    name="sortBy"
                    checked={props.sortBy === "name"}
                    onChange={props.handleChanges}
                  />
                  <RadioLabel htmlFor="name">Name</RadioLabel>
                </div>
                <div>
                  <input
                    type="radio"
                    id="set"
                    name="sortBy"
                    checked={props.sortBy === "set"}
                    onChange={props.handleChanges}
                  />
                  <RadioLabel htmlFor="set">Set</RadioLabel>
                </div>
                <div>
                  <input
                    type="radio"
                    id="date"
                    name="sortBy"
                    checked={props.sortBy === "date"}
                    onChange={props.handleChanges}
                  />
                  <RadioLabel htmlFor="date">Date</RadioLabel>
                </div>

                <RadioTitle>Sort Direction</RadioTitle>
                <div>
                  <input
                    type="radio"
                    id="asc"
                    name="sortDirection"
                    checked={props.sortDirection === "asc"}
                    onChange={props.handleChanges}
                  />
                  <RadioLabel htmlFor="asc">Ascending</RadioLabel>
                </div>
                <div>
                  <input
                    type="radio"
                    id="desc"
                    name="sortDirection"
                    checked={props.sortDirection === "desc"}
                    onChange={props.handleChanges}
                  />
                  <RadioLabel htmlFor="desc">Descending</RadioLabel>
                </div>
              </SortByContainer>
              <StyledButton
                color="BLUE"
                width="85px"
                height="30px"
                onClick={props.createdPdf}
              >
                Download
              </StyledButton>
            </>
          )}

          <Padding />
        </Wrapper>
      </ModalWindow>
    </Background>
  );
}
