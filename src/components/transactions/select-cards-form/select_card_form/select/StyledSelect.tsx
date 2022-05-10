import React from "react";
import styled from "styled-components";
import { ReactComponent as SelectIcon } from "./select-icon.svg";

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  svg {
    position: absolute;
    top: 7.5px;
    right: 5px;
    transform: rotate(270deg);
  }
`;

const Select = styled.select`
  height: 40px;
  width: 100%;
  padding-left: 10px;
  padding-right: 20px;
  border-radius: 5px;
  background-color: #eeeeee;
  -webkit-appearance: none;
  color: black;
  border: 1px solid rgb(118, 118, 118);
  &:disabled {
    color: gray;
  }
  white-space: pre-wrap;
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
