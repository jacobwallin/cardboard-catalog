import React from "react";
import styled from "styled-components";
import { ReactComponent as SelectIcon } from "../../../assets/select-icon.svg";

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  svg {
    position: absolute;
    top: 4px;
    right: 5px;
    transform: rotate(270deg);
  }
`;

const Select = styled.select`
  min-width: 150px;
  height: 30px;
  border-radius: 3px;
  padding-left: 10px;
  padding-right: 20px;
  min-width: 150px;
  border-radius: 3px;
  font-size: 0.9rem;
  background-color: #fff;
  -webkit-appearance: none;
  color: black;
  border: 1px solid rgb(118, 118, 118);
  &:disabled {
    color: gray;
  }
  white-space: pre-wrap;
  [label] {
    color: red;
  }
`;

type ViewProps = React.ComponentProps<typeof Select>;

export default function StyledSelect({ children, ...rest }: ViewProps) {
  return (
    <SelectWrapper>
      <Select {...rest}>{children}</Select>
      <SelectIcon />
    </SelectWrapper>
  );
}
