import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
export const LineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  min-height: 35px;
  border-radius: 5px;
  background: white;
  border: 1px solid lightgrey;
  /* box-shadow: 0 0.46875rem 2.1875rem rgb(4 9 20 / 3%),
    0 0.9375rem 1.40625rem rgb(4 9 20 / 3%),
    0 0.25rem 0.53125rem rgb(4 9 20 / 5%), 0 0.125rem 0.1875rem rgb(4 9 20 / 3%); */
`;

export const CardInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2px 5px 2px 5px;
  width: 100%;
`;

export const GradeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 0 10px 0 10px;
  width: 100%;
  height: 30px;
`;

export const GradeErrorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0 10px 0 10px;
  width: 100%;
  height: 20px;
`;

export const CardNumber = styled.div`
  flex-grow: 0;
  padding: 0 15px 0 15px;
  font-size: 0.9rem;
  min-width: 45px;
  @media only screen and (max-width: 400px) {
    font-size: 0.8em;
  }
`;

export const CardName = styled.div`
  font-size: 0.9rem;
  @media only screen and (max-width: 400px) {
    font-size: 0.8em;
  }
`;

interface StyledInputProps {
  error?: boolean;
}
export const StyledInput = styled.input<StyledInputProps>`
  width: 60px;
  padding: 5px;
  height: 20px;
  border: ${(props) => props.error && "1px solid red"};
`;

export const SerialNumberLabel = styled.label<StyledInputProps>`
  height: 35%;
  font-size: 0.5em;
  color: ${(props) => props.error && "red"};
`;
export const GradeLabel = styled.label`
  font-size: 0.8em;
  margin: 0 5px 0 15px;
`;

export const EnterSNContainer = styled.div`
  height: 100%;
  padding: 0;
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const GradedContainer = styled.div`
  height: 100%;
  padding: 0;
  width: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CloseIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 1px;
  .ex {
    fill: white;
  }
`;

export const QtyInCollection = styled.div`
  font-size: 0.75rem;
  color: gray;
`;

export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const DeleteButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SetName = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
  color: gray;
  font-weight: 500;
`;
