"use server";
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
import { cookies } from "next/headers";

const csrf = async () => {
  const response = await fetch(`${baseUrl}/sanctum/csrf-cookie`, {
    credentials: "include",
    headers: { "X-Requested-With": "XMLHttpRequest" },
  });

  const setCookies = await response.headers.getSetCookie();

  return getCookies(setCookies);
};

const getCookies = (setCookies: string[]) => {
  const toArray = setCookies.toString().split(",");

  const xsrfToken = toArray[0].replace("XSRF-TOKEN=", "");
  const laravelSession = toArray[0].replace("laravel_session=", "");

  return {
    "XSRF-TOKEN": xsrfToken,
    laravel_session: laravelSession,
  };
};

export default csrf;
