import { Navigate, useLocation } from "react-router-dom";

function AdminCheckAuth({ isAuthenticated, children }) {
    const location = useLocation();
    const isLoginPage = location.pathname.includes("/admin/login");
    const isRegisterPage = location.pathname.includes("/admin/register");

    // 🔐 Not logged in → Redirect to admin login (except for /login or /register)
    if (!isAuthenticated && !isLoginPage && !isRegisterPage) {
        return <Navigate to="/admin/login" replace />;
    }

    // 🟢 Already logged in → Prevent access to /login or /register
    if (isAuthenticated && (isLoginPage || isRegisterPage)) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    // ✅ Authorized access
    return <>{children}</>;
}

export default AdminCheckAuth;
