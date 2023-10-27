import csrf from "./csrf";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
type METHOD = "POST" | "GET" | "PUT" | "DELETE";

export const api = async (method: METHOD, url: string, data: object = {}) => {
  const token = await csrf();

  const response = await fetch(`${baseUrl}/${url}`, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": token["XSRF-TOKEN"],
      Accept: "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: method === "GET" ? null : JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json();
};
