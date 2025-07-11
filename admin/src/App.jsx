import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import { adminCheckAuth } from "./store/adminAuthSlice";

import AdminLayout from "./components/admin/layout";
import AdminCheckAuth from "./components/adminCheckAuth";
import AdminAuthLayout from "./components/auth/layout";

import AdminLogin from "./pages/auth/login";
import AdminDashboard from "./pages/dashboard";
import AdminProducts from "./pages/products";
import AdminOrders from "./pages/orders";
import AdminFeatures from "./pages/features";

import { Toaster } from "sonner";
import { Skeleton } from "./components/ui/skeleton";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, user } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    dispatch(adminCheckAuth());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Skeleton className="w-[800px] h-[600px]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Routes>
        {/* Default Route */}
        <Route
          path="/"
          element={
            isAuthenticated && user?.role === "admin"
              ? <Navigate to="/admin/dashboard" />
              : <Navigate to="/auth/login" />
          }
        />

        {/* Auth Routes */}
        <Route path="/auth" element={<AdminAuthLayout />}>
          <Route path="login" element={<AdminLogin />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminCheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </AdminCheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<div className="text-red-600 p-4">404 Not Found</div>} />
      </Routes>

      <Toaster richColors position="top-right" />
    </div>
  );
}

export default App;
