import { Route, Routes, Navigate } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import ShoppingLayout from "./components/shop/layout";
import ShoppingHome from "./pages/shop/home";
import ShoppingListing from "./pages/shop/listing";
import ShoppingCheckout from "./pages/shop/checkout";
import ShoppingAccount from "./pages/shop/account";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Skeleton } from "./components/ui/skeleton";
import ShopCheckAuth from "./components/shopCheckAuth";
import { shopCheckAuth } from "./store/shopAuthSlice";
import Loading from "./pages/loading";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.shopAuth); // ✅ FIXED
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(shopCheckAuth());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden bg-black min-h-screen select-none outline-none">
      <Routes>
        {/* 👇 Root path logic */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/shop/home" />
            ) : (
              <Navigate to="/auth/login" />
            )
          }
        />

        {/* Auth routes */}
        <Route
          path="/auth"
          element={
            <ShopCheckAuth isAuthenticated={isAuthenticated}>
              <AuthLayout />
            </ShopCheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* Shop routes */}
        <Route
          path="/shop"
          element={
            <ShopCheckAuth isAuthenticated={isAuthenticated}>
              <ShoppingLayout />
            </ShopCheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<div className="text-white p-4">404 Not Found</div>} />
      </Routes>

      <Toaster richColors position="top-right" />
    </div>
  );
}

export default App;
