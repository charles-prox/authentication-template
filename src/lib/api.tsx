import { getCookie } from "cookies-next";
import csrf from "./csrf";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
type METHOD = "POST" | "GET" | "PUT" | "DELETE";

const xsrftoken: any = getCookie("XSRF-TOKEN");
const userToken: any = getCookie("token");

const headers = (middleware: "guest" | "auth") => {
  const header: any = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  };

  if (middleware === "guest") header["X-XSRF-TOKEN"] = xsrftoken;
  if (middleware === "auth") header.Authorization = `Bearer ${xsrftoken}`;

  return;
};

const GET = () => {};
