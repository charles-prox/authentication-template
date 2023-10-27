import { api } from "@/lib/api";

export const useAuth = async () => {
  const register = async (data: object) => {
    const response = await api("POST", "register", data);
    return response;
  };

  const login = async (data: object) => {
    const response = await api("POST", "login", data);
    return response;
  };

  const logout = async () => {
    const response = await api("POST", "logout");
    return response;
  };

  return {
    register,
    login,
    logout,
  };
};
