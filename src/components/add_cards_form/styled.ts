import styled from "styled-components";

export const SubmitContainer = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

export const TotalCardsLabel = styled.div`
  margin: 0 25px 0 0;
  font-size: 1.1em;
  font-weight: 600;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  width: 650px;
  @media (max-width: 800px) {
    width: 95%;
  }
`;

export const CardDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export const SubmitError = styled.h6`
  align-self: flex-end;
  width: 130px;
  margin: 0;
  color: red;
  text-align: center;
`;

interface PostResultMessageProps {
  success: boolean;
}
export const PostResultMessage = styled.h3<PostResultMessageProps>`
  color: ${(props) => (props.success ? "green" : "red")};
`;
