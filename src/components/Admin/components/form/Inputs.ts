import styled from "styled-components";

export const Input = styled.input`
  width: 250px;
  height: 35px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid gray;
  font-size: 0.85rem;
  font-weight: 300;
`;

export const LargeInput = styled(Input)`
  width: 250px;
`;

export const NumberInput = styled(Input)`
  width: 100px;
`;

export const Select = styled.select`
  width: 200px;
  height: 35px;
  border-radius: 5px;
  border: 1px solid gray;
`;

export const TextArea = styled.textarea`
  padding: 7px;
  height: 200px;
  width: 100%;
  max-width: 600px;
  resize: none;
  overflow: auto;
  border-radius: 5px;
  border: 1px solid gray;
  font-size: 0.85rem;
  font-weight: 300;
`;
