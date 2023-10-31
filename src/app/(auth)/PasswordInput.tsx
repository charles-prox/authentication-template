"use client";
import React from "react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "@/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/icons/EyeSlashFilledIcon";
import { LockIcon } from "@/icons/LockIcon";
import { useFormContext } from "react-hook-form";
import { transformError } from "@/lib/utils";

type PasswordType = "password" | "password_confirmation";

export default function PasswordInput({
  label,
  name,
  error,
}: {
  label: string;
  name: PasswordType;
  error: string | undefined;
}) {
  const [isVisible, setIsVisible] = React.useState(false);
  const { register } = useFormContext();

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex flex-col">
      <Input
        label={label}
        {...register(name)}
        startContent={<LockIcon />}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
      />
      {error && (
        <p className="text-red-400 text-sm px-3">{transformError(error)}</p>
      )}
    </div>
  );
}
