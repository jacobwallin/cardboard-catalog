import styled from "styled-components";

const ModalWindow = styled.div`
  padding: 0 15px 15px 15px;
  position: absolute;
  left: 50%;
  top: 10%;
  width: 600px;
  transform: translate(-50%, 0);
  background: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  overflow: scroll;
  overflow-y: scroll;
  border: 1px solid gray;
  @media only screen and (max-width: 600px) {
    width: 95%;
  }
`;

export default ModalWindow;
