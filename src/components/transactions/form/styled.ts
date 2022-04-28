import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
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
  font-size: 0.8em;
  font-weight: 500;
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
