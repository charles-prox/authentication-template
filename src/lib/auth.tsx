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

  const header = fetchToken.headers.getSetCookie();
  const xsrf = header[0].split(";");
  const xsrfValue = xsrf[0].split("=");
  const token = decodeURIComponent(xsrfValue[1]);
  console.log("token: " + token);

  const fetchUser = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
    {
      credentials: "include", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "X-XSRF-TOKEN": token,
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  const userDetails = await fetchUser.json();
  console.log("status: " + JSON.stringify(fetchUser.status));
  console.log("userDetails: " + JSON.stringify(userDetails));
  if (userDetails.hasOwnProperty("message")) {
    const message = userDetails.message!;
    if (message.includes("Unauthenticated")) {
      return false;
    }
  }
  return true;
}
