"use client";
import React from "react";
import PasswordInput from "../PasswordInput";
import { MailIcon } from "@/icons/MailIcon";
import { PersonIcon } from "@/icons/PersonIcon";
import { Spacer, Button } from "@nextui-org/react";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "../FormInput";
import { useSchema } from "@/lib/validationSchema";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const { registerFormOptions } = useSchema();
  const methods = useForm(registerFormOptions);
  const { errors } = methods.formState;
  const router = useRouter();

  const onSubmit = async (data: any) => {
    // display form data on success
    console.log("SUCCESS!! -" + JSON.stringify(data));
    // return false;
    const fetchToken = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`,
      {
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "include", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const token: any = getCookie("XSRF-TOKEN");
    // console.log("userDetails: " + JSON.stringify(token));

    const register = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/register`,
      {
        method: "POST",
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "include", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-XSRF-TOKEN": token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
      }
    );

    if (register.status === 204) {
      router.push("/");
    } else {
      const result = await register.json();
      console.log("register result: " + JSON.stringify(result.status));
      // console.log("result.hasOwnProperty: " + result.hasOwnProperty("errors"));

      if (result.hasOwnProperty("errors")) {
        if (result.errors.hasOwnProperty("name"))
          methods.setError("name", {
            type: "custom",
            message: result.errors.name.toString(),
          });
        if (result.errors.hasOwnProperty("email"))
          methods.setError("email", {
            type: "custom",
            message: result.errors.email.toString(),
          });
        if (result.errors.hasOwnProperty("password")) {
          methods.setError("password", {
            type: "custom",
            message: result.errors.password.toString(),
          });
        }
      }
    }
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
