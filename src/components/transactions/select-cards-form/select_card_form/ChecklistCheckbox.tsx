import React from "react";
import styled from "styled-components";

const ShowChecklist = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShowChecklistLabel = styled.label`
  font-size: 0.9rem;
  color: gray;
`;

interface Props {
  checked: boolean;
  disabled: boolean;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export default function ChecklistCheckbox({
  checked,
  onChange,
  disabled,
}: Props) {
  return (
    <ShowChecklist>
      <ShowChecklistLabel htmlFor="show-checklist">
        select from checklist
      </ShowChecklistLabel>
      <input
        id="show-checklist"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
    </ShowChecklist>
  );
}
