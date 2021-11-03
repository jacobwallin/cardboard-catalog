import styled from "styled-components";

export const Header = styled.div`
  width: auto;
  font-size: 1.5rem;
  text-align: center;
  padding: 10px;
`;

export const TextArea = styled.textarea`
  width: 95%;
  height: 400px;
  margin: 10px;
  resize: none;
`;

export const Input = styled.input`
  height: 30px;
  width: 300px;
  border: 1px solid gray;
  border-radius: 3px;
  padding: 5px;
`;

export const Label = styled.label`
  font-size: 0.8rem;
  margin: 0 0 3px 5px;
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 30px;
  padding: 15px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;

export const SmallPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 300px;
`;

export const ContentWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
  width: 100%;
`;

export const NoCardsFound = styled.div`
  font-size: 1rem;
  color: red;
`;
