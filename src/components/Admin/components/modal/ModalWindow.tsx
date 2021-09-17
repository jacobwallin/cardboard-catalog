import styled from "styled-components";

const ModalWindow = styled.div`
  position: fixed;
  left: 50%;
  top: 20%;
  width: 100%;
  max-width: 600px;
  min-width: 250px;
  transform: translate(-50%, 0);
  background: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: left;
`;

export default ModalWindow;
