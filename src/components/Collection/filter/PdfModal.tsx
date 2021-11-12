import React from "react";
import styled from "styled-components";
import Background from "../../shared/Background";
import ModalWindow from "../../Admin/components/modal/ModalWindow";
import StyledButton from "../../Admin/components/StyledButton";
import ModalHeader from "../../Admin/components/modal/ModalHeader";
import { LoadingDots } from "../../shared/Loading";

const PdfTitle = styled.input`
  height: 30px;
  width: 250px;
  margin: 20px 0 20px 0;
`;

const Padding = styled.div`
  height: 20px;
`;

const LoadingMessage = styled.div``;

interface Props {
  createdPdf(): void;
  dismiss(): void;
  handleTitleChange(e: React.ChangeEvent<HTMLInputElement>): void;
  loading: boolean;
  loadingMessage: string;
}

export default function PdfModal(props: Props) {
  return (
    <Background>
      <ModalWindow>
        <ModalHeader
          title="Download PDF Checklist"
          handleClose={props.dismiss}
        />
        {props.loading ? (
          <>
            <LoadingDots />
            <LoadingMessage>{props.loadingMessage}</LoadingMessage>
          </>
        ) : (
          <>
            <PdfTitle
              type="text"
              placeholder="Enter PDF Title"
              onChange={props.handleTitleChange}
            />
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
      </ModalWindow>
    </Background>
  );
}
