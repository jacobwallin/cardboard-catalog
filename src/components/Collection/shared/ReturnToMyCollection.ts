import styled from "styled-components";

const ReturnToMyCollection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 10px;
  height: 22px;
  width: 150px;
  font-size: 0.8rem;
  color: #555;
  cursor: pointer;
  background-color: #ddd;
  border-radius: 3px;
  align-self: flex-start;
  margin: 0 0 0 20px;
  &:hover {
    background-color: #bbb;
  }
`;

export default ReturnToMyCollection;
