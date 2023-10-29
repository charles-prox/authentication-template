import { Spacer, Button, Input } from "@nextui-org/react";
import React from "react";
import PasswordInput from "../PasswordInput";
import { MailIcon } from "@/icons/MailIcon";
import { PersonIcon } from "@/icons/PersonIcon";
import Header from "../Header";

const RegisterPage = () => {
  return (
    <>
      <Header text="Register" />

      <Input startContent={<PersonIcon />} type="text" label="Name" />
      <Input startContent={<MailIcon />} type="email" label="Email" />
      <PasswordInput label="Password" />
      <PasswordInput label="Confirm Password" />
      <Spacer y={5} />
      <Button size="lg" color="success">
        Register
      </Button>
    </>
  );
};

export default RegisterPage;
