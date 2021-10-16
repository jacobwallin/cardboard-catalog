import styled from "styled-components";

const CollectionContainer = styled.div`
  background: white;
  padding: 10px;
  border-right: 1px solid lightgrey;
  border-left: 1px solid lightgrey;
  height: 100%;
  flex-grow: 1;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (max-width: 1024px) {
    width: 75%;
  }
  @media only screen and (max-width: 600px) {
    width: 95%;
  }
`;

export default CollectionContainer;