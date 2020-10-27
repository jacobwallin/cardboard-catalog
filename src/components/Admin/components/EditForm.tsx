import React from "react";
import styled from "styled-components";

export const EditFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin: 10px;
  padding: 10px;
  max-width: 1200px;
`;

const LineItem = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
`;

const LineItemTitle = styled.div`
  font-weight: bold;
  min-width: 150px;
  width: 25%;
`;

const LineItemData = styled.div`
  font-weight: normal;
  width: 75%;
`;

interface Props {
  title: string;
  data: string | number;
  editing: boolean;
  input: any;
}

export default function EditFormLine(props: Props) {
  return (
    <LineItem>
      <LineItemTitle>{props.title}</LineItemTitle>
      <LineItemData>{props.editing ? props.input : props.data}</LineItemData>
    </LineItem>
  );
}
