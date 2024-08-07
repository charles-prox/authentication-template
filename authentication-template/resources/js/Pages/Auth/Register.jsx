import React from "react";
import { RegisterForm } from "@/Components/Forms/RegisterForm";
import AuthLayout from "@/Layouts/AuthLayout";
import { Head } from "@inertiajs/react";

const Register = () => {
    return (
        <AuthLayout>
            <Head title="Register" />
            <RegisterForm />
        </AuthLayout>
    );
};

export default Register;
