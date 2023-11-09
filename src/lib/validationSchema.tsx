import { object, string, ref } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const loginSchema = object().shape({
  email: string().email().required(),
  password: string().required(),
});

const registerSchema = object().shape({
  name: string().required(),
  email: string().email().required(),
  password: string().required().min(6),
  password_confirmation: string()
    .required()
    .oneOf([ref("password")], "This field must match with your password"),
});

export const useSchema = () => {
  const loginFormOptions = { resolver: yupResolver(loginSchema) };
  const registerFormOptions = { resolver: yupResolver(registerSchema) };

  return {
    loginFormOptions,
    registerFormOptions,
  };
};
