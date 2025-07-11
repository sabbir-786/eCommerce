import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import CommonForm from '@/components/form';
import { registerFormControls } from '@/config';
import { shopRegister } from '@/store/shopAuthSlice';

const initialState = {
    userName: "",
    email: "",
    password: "",
};

const AuthRegister = () => {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function onSubmit(event) {
        event.preventDefault();

        try {
            const result = await dispatch(shopRegister(formData));
            const data = result.payload;

            if (data?.success) {
                toast.success(data.message || "Registered successfully!");
                navigate("/auth/login");
            } else {
                toast.error(data?.message || "Registration failed.");
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    }

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Create new account
                </h1>
                <p className="mt-2">
                    Already have an account
                    <Link
                        className="font-medium ml-2 text-primary hover:underline"
                        to="/auth/login"
                    >
                        Login
                    </Link>
                </p>
            </div>
            <CommonForm
                formControls={registerFormControls}
                buttonText="Sign Up"
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default AuthRegister;
