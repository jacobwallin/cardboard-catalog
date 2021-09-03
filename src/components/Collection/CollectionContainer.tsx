import styled from "styled-components";

const CollectionContainer = styled.div`
  background: white;
  padding: 10px;
  margin: 15px 0 15px 0;
  border-radius: 10px;
  border: 1px solid lightgrey;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (max-width: 1024px) {
    width: 75%;
  }
  @media only screen and (max-width: 400px) {
    width: 95%;
  }
`;

export default CollectionContainer;
