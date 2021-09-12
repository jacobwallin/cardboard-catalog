import styled from "styled-components";

const FormContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  width: 100%;
  max-width: 800px;
  min-width: 250px;
  @media (max-width: 900px) {
    width: 90%;
  }
`;

export default FormContainer;
