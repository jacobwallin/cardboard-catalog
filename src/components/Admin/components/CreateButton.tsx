import React from "react";
import StyledButton from "./StyledButton";

export default function CreateButton(props: any) {
  return (
    <StyledButton
      {...props}
      color="GREEN"
      height="27px"
      width="125px"
      fontSize=".9rem"
    />
  );
}
