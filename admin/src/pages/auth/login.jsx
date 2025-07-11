import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';


import { adminLogin } from '@/store/adminAuthSlice';
import CommonForm from '@/components/form';
import { loginFormControls } from '@/config';

const initialState = {
    email: "",
    password: "",
};

function AdminLogin() {
    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function onSubmit(e) {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            return toast.error("Please fill in all fields");
        }

        setLoading(true);
        try {
            const data = await dispatch(adminLogin(formData)).unwrap();

            if (data.success) {
                toast.success(data.message || "Login successful");
                navigate("/admin/dashboard");
            } else {
                toast.error(data.message || "Login failed");
            }
        } catch (err) {
            toast.error(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
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
}

export default AdminLogin;
