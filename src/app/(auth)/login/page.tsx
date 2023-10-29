import { Button, Input, Spacer } from "@nextui-org/react";
import React from "react";
import PasswordInput from "../PasswordInput";
import { MailIcon } from "@/icons/MailIcon";
import Header from "../Header";

const LoginPage = () => {
  return (
    <>
      <Header text="Login" />
      <Input startContent={<MailIcon />} type="email" label="Email" />
      <PasswordInput label="Password" />
      <Spacer y={5} />
      <Button size="lg" color="success">
        Login
      </Button>
    </>
  );
};

export default LoginPage;
