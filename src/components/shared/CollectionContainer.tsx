import styled from "styled-components";

const CollectionContainer = styled.div`
  background: white;
  padding-bottom: 50px;
  border-right: 1px solid lightgrey;
  border-left: 1px solid lightgrey;
  height: 100%;
  flex-grow: 1;
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (max-width: 1050px) {
    width: 100%;
    border: none;
  }
`;

export default CollectionContainer;
