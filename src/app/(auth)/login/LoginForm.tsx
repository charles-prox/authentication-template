"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { MailIcon } from "@/icons/MailIcon";
import FormInput from "../FormInput";
import PasswordInput from "../PasswordInput";
import { Button, Spacer } from "@nextui-org/react";
import { useSchema } from "@/lib/validationSchema";

const LoginForm = () => {
  const { loginFormOptions } = useSchema();
  const methods = useForm(loginFormOptions);
  const { errors } = methods.formState;
  const onSubmit = (data: any) => {};

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4">
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
          <Spacer y={5} />
          <Button type="submit" size="lg" color="success">
            Login
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
