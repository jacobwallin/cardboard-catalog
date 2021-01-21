import React from "react";
import styled from "styled-components";

const LineItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 10px;
`;

const LineItemTitle = styled.div`
  font-weight: bold;
  width: 175px;
`;

const LineItemData = styled.div`
  font-weight: normal;
  width: 75%;
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
