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
  width: 200px;
  border: 1px solid gray;
  border-radius: 3px;
  padding: 5px;
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 15px;
`;
