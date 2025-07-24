import { Navigate, useLocation } from "react-router-dom";

function AdminCheckAuth({ isAuthenticated, children }) {
    const location = useLocation();

    if (
        !isAuthenticated &&
        !location.pathname.includes("/login") &&
        !location.pathname.includes("/register")
    ) {
        return <Navigate to="/auth/login" />;
    }

    if (
        isAuthenticated &&
        (location.pathname.includes("/login") ||
            location.pathname.includes("/register"))
    ) {
        return <Navigate to="/admin/home" />;
    }

    return <>{children}</>;
}

export default AdminCheckAuth;