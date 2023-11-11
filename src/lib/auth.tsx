import { api } from "./api";

export async function isAuthenticated() {
  const fetchUser = await api.GET("auth", "api/user");

  const userDetails = fetchUser.result;
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
