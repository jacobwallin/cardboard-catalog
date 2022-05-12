import React from "react";
import styled from "styled-components";
import { ReactComponent as SelectIcon } from "../../../../assets/select-icon.svg";

const SelectWrapper = styled.div`
  position: relative;
  width: 200px;
  svg {
    position: absolute;
    top: 6px;
    right: 5px;
    transform: rotate(270deg);
  }
`;

const Select = styled.select`
  height: 35px;
  width: 100%;
  padding-left: 10px;
  padding-right: 20px;
  border-radius: 5px;
  font-size: 0.9rem;
  background-color: #efefef;
  -webkit-appearance: none;
  color: black;
  border: 1px solid lightgray;
  &:disabled {
    color: gray;
  }
  white-space: pre-wrap;
  [label] {
    color: red;
  }
`;

type ViewProps = React.ComponentProps<typeof Select>;

export default function AdminSelect({ children, ...rest }: ViewProps) {
  return (
    <SelectWrapper>
      <Select {...rest}>{children}</Select>
      <SelectIcon />
    </SelectWrapper>
  );
}
