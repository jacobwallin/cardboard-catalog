import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const DateInput = styled.input.attrs(() => ({
  type: "date",
}))`
  width: 150px;
  height: 30px;
  padding: 5px;
`;

export const TextInput = styled.input.attrs(() => ({
  type: "text",
}))`
  width: 150px;
  height: 30px;
  padding: 5px;
`;
export const NumberInput = styled.input.attrs(() => ({
  type: "number",
  step: "1",
}))`
  width: 75px;
  height: 30px;
  padding: 5px;
`;

export const Textarea = styled.textarea`
  padding: 5px;
  height: 85px;
  width: 100%;
  max-width: 500px;
  resize: none;
  overflow: auto;
`;

export const Label = styled.label`
  font-weight: 300;
  font-size: 0.95rem;
  color: #555;
  margin: 0 0 2px 2px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Flex = styled.div`
  display: flex;
  gap: 25px;
  @media only screen and (max-width: 400px) {
    flex-direction: column;
    gap: 15px;
  }
`;
export const CancelWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

export const DataTitle = styled.div`
  font-weight: 300;
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 5px;
`;

export const DataValue = styled.div`
  font-weight: normal;
  font-size: 1.1rem;
  margin-top: 3px;
  white-space: pre-wrap;
  font-weight: 400;
`;

export const DataFieldContainer = styled.div`
  align-self: flex-start;
`;
