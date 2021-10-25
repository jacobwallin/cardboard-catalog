import styled from "styled-components";

const ModalBackground = styled.div`
  z-index: 21;
  position: fixed;
  width: 100vw;
  min-height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  overflow: scroll;
`;

export default ModalBackground;
