import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div
            className="flex min-h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat px-4"
            style={{
                backgroundImage: "url('/Login-Bg.jpg')", // ✅ Path to your image in /public
            }}
        >
            {/* Optional overlay for better contrast */}
            <div className="w-full max-w-md bg-white/20 backdrop-blur-md rounded-xl p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
