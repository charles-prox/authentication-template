"use server";
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
import { cookies } from "next/headers";

const csrf = async () => {
  // const fetchToken = await fetch(
  //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`,
  //   {
  //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: "include", // include, *same-origin, omit
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       "X-Requested-With": "XMLHttpRequest",
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //   }
  // );
};

// const getCookies = (setCookies: string[]) => {
//   const toArray = setCookies.toString().split(",");

//   const xsrfToken = toArray[0].replace("XSRF-TOKEN=", "");
//   const laravelSession = toArray[0].replace("laravel_session=", "");

//   return {
//     "XSRF-TOKEN": xsrfToken,
//     laravel_session: laravelSession,
//   };
// };

export default csrf;
