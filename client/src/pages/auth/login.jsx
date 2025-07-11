import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useSonner } from 'sonner';
import { shopLogin } from '@/store/shopAuthSlice';
import CommonForm from '@/components/form';
import { loginFormControls } from '@/config';

const initialState = {
    email: "",
    password: "",
};

const AuthLogin = () => {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const { toast } = useSonner();

    function onSubmit(event) {
        event.preventDefault();

        dispatch(shopLogin(formData)).then((data) => {
            if (data?.payload?.success) {
                toast({
                    title: data?.payload?.message,
                });
            } else {
                toast({
                    title: data?.payload?.message,
                    variant: "destructive",
                });
            }
        });
    }

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Sign in to your account
                </h1>
                <p className="mt-2">
                    Don't have an account
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

export default AuthLogin;
