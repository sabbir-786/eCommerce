import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner'; // ✅ Use directly
import CommonForm from '@/components/form';
import { loginFormControls } from '@/config';
import { adminLogin } from '@/store/adminAuthSlice';

const initialState = {
    email: "",
    password: "",
};

const AdminLogin = () => {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // ✅ Added

    async function onSubmit(event) {
        event.preventDefault();

        try {
            const result = await dispatch(adminLogin(formData));
            const data = result.payload;

            if (data?.success) {
                toast.success(data.message || "Admin Login successful!");
                navigate("/");
            } else {
                toast.error(data?.message || "Admin Login failed.");
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    }

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Sign in to your account
                </h1>
                <p className="mt-2">
                    Don't have an account?
                    <Link
                        className="font-medium ml-2 text-primary hover:underline"
                        to="/auth/register"
                    >
                        Register
                    </Link>
                </p>
            </div>
            <CommonForm
                formControls={loginFormControls}
                buttonText={"Sign In"}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default AdminLogin;
