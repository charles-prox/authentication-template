import { getCookie } from "cookies-next";

type Middleware = "guest" | "auth";

const headers = (middleware?: Middleware, bearertoken?: any) => {
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
    const userToken: any = bearertoken ? bearertoken : getCookie("token");
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

const GET = async (middleware: Middleware, url: string, bearertoken?: any) => {
  middleware === "guest" && (await csrf());
  const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`, {
    credentials: "include", // include, *same-origin, omit
    cache: "force-cache",
    headers: headers(middleware, bearertoken),
  });

  return { result: await request.json(), status: request.status };
};

const POST = async (
  middleware: Middleware,
  url: string,
  data: JSON | FormData | null,
  bearertoken?: any
) => {
  middleware === "guest" && (await csrf());
  const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`, {
    method: "POST",
    credentials: "include", // include, *same-origin, omit
    cache: "force-cache",
    headers: headers(middleware, bearertoken),
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
