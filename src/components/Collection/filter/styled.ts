import styled from "styled-components";

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  gap: 25px;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
`;

export const SectionHeader = styled.div`
  color: grey;
  font-size: 0.8rem;
  margin-bottom: 10px;
`;

export const Filter = styled.div`
  width: 100%;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 230px;
`;

export const Select = styled.select`
  width: 160px;
  border: 1px solid lightgray;
  height: 23px;
  border-radius: 3px;
  font-size: 0.7rem;
`;

export const AttributeSelect = styled(Select)`
  width: 85px;
`;

export const Label = styled.label`
  font-size: 0.8rem;
  margin-right: 10px;
`;

export const Checkbox = styled.input`
  width: 14px;
  height: 14px;
`;

export const TextInput = styled.input`
  width: 160px;
  height: 23px;
  border: 1px solid lightgray;
  border-radius: 3px;
`;

export const TableHeader = styled.div`
  position: relative;
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;

export const CardTotal = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

export const Reset = styled.div`
  width: 125px;
  height: 25px;
  font-size: 0.9rem;
  line-height: 25px;
  text-align: center;
  text-decoration: none;
  color: white;
  cursor: pointer;
  background-color: #f24236;
  border-radius: 3px;
  &:hover {
    background-color: #d9291d;
  }
  &:active {
    background-color: #a60000;
  }
`;
export const Pdf = styled.div`
  width: 125px;
  height: 25px;
  font-size: 0.9rem;
  line-height: 25px;
  text-align: center;
  text-decoration: none;
  color: white;
  cursor: pointer;
  background-color: #aaaaaa;
  border-radius: 3px;
  &:hover {
    background-color: #919191;
  }
  &:active {
    background-color: #5e5e5e;
  }
`;

export const Apply = styled(Reset)`
  background-color: rgb(0, 74, 206);
  &:hover {
    background-color: #0031b5;
  }
  &:active {
    background-color: #000082;
  }
`;

export const TableColumns = styled.div`
  color: #555555;
  font-size: 0.8rem;
  margin-right: 20px;
  padding: 3px;
  cursor: pointer;
  border-radius: 2px;
  &:hover {
    background-color: #c4c4c4;
  }
  &:active {
    background-color: #919191;
  }
`;

export const PageHeader = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 20px;
  margin-top: 10px;
`;

export const Buttons = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  gap: 5px;
  width: 100%;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const ResetApply = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const SelectColumns = styled.div<{ show: boolean }>`
  display: ${(props) => !props.show && "none"};
  position: absolute;
  z-index: 2;
  right: 0px;
  top: 25px;
  width: 150px;
  border-radius: 2px;
  border: 1px solid grey;
  padding: 5px;
  margin-top: 5px;
  background-color: white;
`;

export const ShowColumn = styled.div`
  width: auto;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const FilterBubble = styled.div`
  height: 20px;
  font-size: 0.8rem;
  background-color: lightgray;
  border-radius: 50%;
`;

export const LoadingContainer = styled.div`
  height: 600px;
`;
