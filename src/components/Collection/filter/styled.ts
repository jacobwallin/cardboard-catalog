import styled from "styled-components";

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
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
  @media only screen and (max-width: 600px) {
    width: 200px;
  }
`;

export const Select = styled.select`
  width: 125px;
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
  width: 125px;
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

export const ResetPdfButtons = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  justify-content: flex-end;
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
