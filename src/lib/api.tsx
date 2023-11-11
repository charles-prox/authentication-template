import { getCookie } from "cookies-next";

type Middleware = "guest" | "auth";

const headers = (middleware?: Middleware) => {
  const headerList: any = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  };

  if (middleware === "guest") {
    const xsrftoken: any = getCookie("XSRF-TOKEN");
    headerList["X-XSRF-TOKEN"] = xsrftoken;
  }

  if (middleware === "auth") {
    const userToken: any = getCookie("token");
    headerList.Authorization = `Bearer ${userToken}`;
  }

  return headerList;
};

const csrf = async () => {
  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`, {
    credentials: "include", // include, *same-origin, omit
    headers: headers(),
  });
};

const GET = async (middleware: Middleware, url: string) => {
  middleware === "guest" && (await csrf());
  const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`, {
    credentials: "include", // include, *same-origin, omit
    headers: headers(middleware),
  });

  return { result: await request.json(), status: request.status };
};

const POST = async (
  middleware: Middleware,
  url: string,
  data: JSON | FormData
) => {
  middleware === "guest" && (await csrf());
  const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`, {
    method: "POST",
    credentials: "include", // include, *same-origin, omit
    headers: headers(middleware),
    body: JSON.stringify(data),
  });

  return { result: await request.json(), status: request.status };
};

export const api = {
  // csrf,
  headers,
  GET,
  POST,
};
