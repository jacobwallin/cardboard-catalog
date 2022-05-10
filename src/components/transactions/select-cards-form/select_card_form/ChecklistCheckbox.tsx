import React from "react";
import styled from "styled-components";

const ShowChecklist = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  align-self: flex-start;
  top: 195px;
  left: 0;
`;

const ShowChecklistLabel = styled.label`
  font-size: 0.9rem;
  color: gray;
`;

interface Props {
  checked: boolean;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export default function ChecklistCheckbox({ checked, onChange }: Props) {
  return (
    <ShowChecklist>
      <ShowChecklistLabel htmlFor="show-checklist">
        Select from checklist
      </ShowChecklistLabel>
      <input
        id="show-checklist"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
    </ShowChecklist>
  );
}
