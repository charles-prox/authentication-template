import React from "react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon, EyeSlashFilledIcon, LockIcon } from "./icons";

export default function PasswordInput({
    label,
    labelPlacement,
    name,
    error,
    placeholder,
    value,
    setValue,
}) {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <Input
            name={name}
            id={name}
            type={isVisible ? "text" : "password"}
            label={label}
            labelPlacement={labelPlacement}
            placeholder={placeholder}
            variant="bordered"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            color={!!error ? "danger" : "default"}
            isInvalid={!!error}
            errorMessage={error}
            classNames={{
                label: "text-black dark:text-white/90 font-bold",
                inputWrapper: "border-slate-400",
            }}
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
            isRequired
        />
    );
}
