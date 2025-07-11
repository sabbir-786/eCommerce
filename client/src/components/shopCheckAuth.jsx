import { Navigate, useLocation } from "react-router-dom";

function ShopCheckAuth({ isAuthenticated, children }) {
    const location = useLocation();

    // If not logged in and not on login/register → redirect to login
    if (
        !isAuthenticated &&
        !location.pathname.includes("/login") &&
        !location.pathname.includes("/register")
    ) {
        return <Navigate to="/auth/login" />;
    }

    // If logged in and trying to access login/register → redirect to /shop/home
    if (
        isAuthenticated &&
        (location.pathname.includes("/login") ||
            location.pathname.includes("/register"))
    ) {
        return <Navigate to="/shop/home" />;
    }

    return <>{children}</>;
}

export default ShopCheckAuth;
