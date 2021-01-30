import React from "react";
import styled from "styled-components";

const LineItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const LineItemTitle = styled.div`
  font-weight: bold;
  font-size: 0.9em;
  padding-bottom: 5px;
`;

const LineItemData = styled.div`
  font-weight: normal;
  padding-right: 25px;
`;

interface FormLineProps {
  title: string;
  data: any;
  editing: boolean;
  input: any;
}

export default function EditFormLine(props: FormLineProps) {
  return (
    <LineItem>
      <LineItemTitle>{props.title}</LineItemTitle>
      <LineItemData>{props.editing ? props.input : props.data}</LineItemData>
    </LineItem>
  );
}
