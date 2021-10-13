import React from "react";
import StyledButton from "./StyledButton";

export default function CreateButton(props: any) {
  return (
    <StyledButton
      {...props}
      color="GREEN"
      height="30px"
      width="130px"
      fontSize=".9rem"
    />
  );
}
