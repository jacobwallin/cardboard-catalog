import styled from "styled-components";

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
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
  width: 12px;
  height: 12px;
`;

export const TextInput = styled.input`
  width: 125px;
  align-self: flex-end;
  margin-bottom: 2px;
`;
