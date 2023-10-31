import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Card
        isBlurred
        className="grow m-auto border-none bg-background/60 dark:bg-default-100/50 max-w-[500px]"
        shadow="sm"
      >
        <CardBody>
          <div className="flex flex-row items-center justify-center pb-8">
            <Image src="/images/logo.png" width={80} height={80} alt="logo" />
            <h1 className="p-2 text-5xl">NextUI</h1>
          </div>
          <div className="p-5">{children}</div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AuthLayout;
