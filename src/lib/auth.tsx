import { getCookie } from "cookies-next";

export async function isAuthenticated() {
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

  const fetchUser = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
    {
      credentials: "include", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "X-XSRF-TOKEN": token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  const userDetails = await fetchUser.json();
  console.log("userDetails: " + JSON.stringify(userDetails));
  if (userDetails.hasOwnProperty("message")) {
    const message = userDetails.message!;
    if (message.includes("Unauthenticated")) {
      return false;
    }
  }
  return true;
}
