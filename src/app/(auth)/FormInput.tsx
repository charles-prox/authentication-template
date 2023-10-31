import { transformError } from "@/lib/utils";
import { Input } from "@nextui-org/react";
import React from "react";
import { useFormContext } from "react-hook-form";

const FormInput = ({
  name,
  error,
  startContent,
  type,
  label,
}: {
  name: string;
  error: string | undefined;
  type: string;
  label: string;
  startContent: React.ReactNode;
}) => {
  const { register } = useFormContext();
  return (
    <div className="flex flex-col">
      <Input
        {...register(name)}
        startContent={startContent}
        type={type}
        label={label}
      />
      {error && (
        <p className="text-red-400 text-sm px-3">{transformError(error)}</p>
      )}
    </div>
  );
};

export default FormInput;
