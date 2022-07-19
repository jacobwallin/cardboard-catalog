import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Input = styled.input`
  height: 40px;
  width: 100px;
  font-size: 0.9rem;
  -webkit-appearance: none;
  margin: 0 10px 0 10px;
  padding-left: 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  &:disabled {
    border: 1px solid lightgray;
  }
  @media (max-width: 768px) {
    width: 65px;
  }
`;

export const Label = styled.label`
  font-weight: 400;
  font-size: 1rem;
  color: #777;
  margin-left: 7px;
  margin-bottom: 2px;
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SelectCardContainer = styled.form`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
`;

export const Flex = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
  margin-top: 35px;
`;

export const CardCode = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  font-weight: 400;
  margin-left: 10px;
  span {
    margin-left: 5px;
    font-weight: 500;
  }
`;

export const AbsoluteContainer = styled.div`
  position: absolute;
  top: 307px;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
