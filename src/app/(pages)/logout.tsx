"use client";
import { api } from "@/lib/api";
import { Button } from "@nextui-org/react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React from "react";

const Logout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const logout = await api.POST("auth", "api/logout", null);

    if (logout.status === 200) {
      deleteCookie("token");
      deleteCookie("XSRF-TOKEN");
      router.push("/login");
    }
  };
  return (
    <>
      <Button color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
};

export default Logout;
