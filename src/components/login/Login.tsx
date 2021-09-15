import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Login() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  function toggle() {
    setShowLoginForm(!showLoginForm);
  }
  return (
    <>
      {showLoginForm ? (
        <LoginForm toggleForm={toggle} />
      ) : (
        <RegisterForm toggleForm={toggle} />
      )}
    </>
  );
}
