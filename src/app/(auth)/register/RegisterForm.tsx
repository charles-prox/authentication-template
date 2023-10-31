"use client";
import React from "react";
import PasswordInput from "../PasswordInput";
import { MailIcon } from "@/icons/MailIcon";
import { PersonIcon } from "@/icons/PersonIcon";
import { Spacer, Button } from "@nextui-org/react";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "../FormInput";
import { useSchema } from "@/lib/validationSchema";

const RegisterForm = () => {
  const { registerFormOptions } = useSchema();
  const methods = useForm(registerFormOptions);
  const { errors } = methods.formState;

  const onSubmit = (data: any) => {
    // display form data on success
    console.log("SUCCESS!! -" + JSON.stringify(data));
    // return false;
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4 ">
          <FormInput
            name="name"
            startContent={<PersonIcon />}
            type="text"
            label="Name"
            error={errors.name?.message}
          />
          <FormInput
            name="email"
            startContent={<MailIcon />}
            type="email"
            label="Email"
            error={errors.email?.message}
          />
          <PasswordInput
            name="password"
            label="Password"
            error={errors.password?.message}
          />
          <PasswordInput
            name="password_confirmation"
            label="Confirm Password"
            error={errors.password_confirmation?.message}
          />
          <Spacer y={5} />
          <Button type="submit" size="lg" color="success">
            Register
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
