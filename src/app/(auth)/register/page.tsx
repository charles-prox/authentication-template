import React from "react";

import Header from "../Header";
import RegisterForm from "./RegisterForm";
import { Spacer } from "@nextui-org/react";

const RegisterPage = () => {
  return (
    <>
      <Header text="Register" />
      <Spacer y={4} />
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
