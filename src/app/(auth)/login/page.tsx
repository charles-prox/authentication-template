import { Spacer } from "@nextui-org/react";
import React from "react";
import Header from "../Header";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <>
      <Header text="Login" />
      <Spacer y={4} />
      <LoginForm />
    </>
  );
};

export default LoginPage;
