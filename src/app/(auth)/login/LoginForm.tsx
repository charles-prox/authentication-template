"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { MailIcon } from "@/icons/MailIcon";
import FormInput from "../FormInput";
import PasswordInput from "../PasswordInput";
import { Button, Spacer } from "@nextui-org/react";
import { useSchema } from "@/lib/validationSchema";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const { loginFormOptions } = useSchema();
  const methods = useForm(loginFormOptions);
  const { errors } = methods.formState;
  const router = useRouter();

  const onSubmit = async (data: any) => {
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

    const login = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
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
    });

    const result = await login.json();

    console.log("token: " + JSON.stringify(result));

    if (login.status === 204 || 302) {
      // router.push("/dashboard");
      console.log("status: " + login.status);
    } else {
      const result = await login.json();
      console.log("login result: " + JSON.stringify(result.status));
      // console.log("result.hasOwnProperty: " + result.hasOwnProperty("errors"));

      if (result.hasOwnProperty("errors")) {
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
