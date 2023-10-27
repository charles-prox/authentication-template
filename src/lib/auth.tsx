import { api } from "./api";

export async function user() {
  return await api("GET", "api/user");
}

export async function isAuthenticated() {
  const userDetails = await user();
  if (userDetails.hasOwnProperty("message")) {
    const message = userDetails.message!;
    if (message.includes("Unauthenticated")) {
      return false;
    }
  }
  return true;
}
