import React from "react";
import { Head } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";
import { LoginForm } from "@/Components/Forms/LoginForm";

const Login = ({ status }) => {
    return (
        <AuthLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <LoginForm />
        </AuthLayout>
    );
};

export default Login;
