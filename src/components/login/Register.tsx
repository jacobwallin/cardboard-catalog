import React, { useState } from "react";
import * as Styled from "./styled";

interface FormState {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordOne: string;
  passwordTwo: string;
}

export default function Register() {
  const [formState, setFormState] = useState<FormState>({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    passwordOne: "",
    passwordTwo: "",
  });

  function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormState({ ...formState, [event.target.id]: event.target.value });
  }

  return (
    <Styled.LoginWrapper>
      <Styled.LoginContainer>
        <h4>Create Account</h4>
        <Styled.LoginFormContainer>
          <Styled.StyledInput
            type="text"
            id="username"
            value={formState.username}
            placeholder="username"
            onChange={handleFormChange}
          />
          <Styled.StyledInput
            type="email"
            id="email"
            value={formState.email}
            placeholder="email"
            onChange={handleFormChange}
          />
          <Styled.StyledInput
            type="text"
            id="firstName"
            value={formState.firstName}
            placeholder="first name"
            onChange={handleFormChange}
          />
          <Styled.StyledInput
            type="text"
            id="lastName"
            value={formState.lastName}
            placeholder="last name"
            onChange={handleFormChange}
          />
          <Styled.StyledInput
            type="password"
            id="passwordOne"
            value={formState.passwordOne}
            placeholder="password"
            onChange={handleFormChange}
          />
          <Styled.StyledInput
            type="password"
            id="passwordTwo"
            value={formState.passwordTwo}
            placeholder="confirm password"
            onChange={handleFormChange}
          />
        </Styled.LoginFormContainer>
      </Styled.LoginContainer>
    </Styled.LoginWrapper>
  );
}
