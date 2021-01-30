import styled from "styled-components";

const StyledTextArea = styled.textarea<{ height?: string }>`
  width: 100%;
  resize: none;
  padding: 10px;
  height: ${(props) => props.height || "200px"};
`;

export default StyledTextArea;
