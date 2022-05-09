import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Select = styled.select`
  height: 40px;
  width: 100%;
  padding-left: 10px;
  padding-right: 20px;
  border-radius: 5px;
  background-color: #eeeeee;
  color: black;
  border: 1px solid rgb(118, 118, 118);
  &:disabled {
    color: gray;
  }
  white-space: pre-wrap;
`;

export const Input = styled.input`
  height: 40px;
  width: 100px;
  margin: 0 10px 0 10px;
  padding-left: 10px;
  @media (max-width: 768px) {
    width: 65px;
  }
`;

export const Label = styled.label`
  font-weight: 300;
  font-size: 1rem;
  color: #555;
  margin-left: 5px;
  margin-bottom: 2px;
`;

export const SelectCardContainer = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Flex = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;

export const ShowChecklist = styled.div<{ absolute?: boolean }>`
  display: flex;
  align-items: center;
  position: ${(props) => (props.absolute ? "absolute" : "static")};
  align-self: flex-start;
  bottom: -25px;
  left: 0;
`;

export const ShowChecklistLabel = styled.label`
  font-size: 0.9rem;
  color: gray;
`;

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  width: 100%;
`;
