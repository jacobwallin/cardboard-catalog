import styled from "styled-components";

export const Select = styled.select`
  height: 40px;
  width: 100%;
  padding-left: 10px;
  padding-right: 20px;
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

export const SelectCardContainer = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
