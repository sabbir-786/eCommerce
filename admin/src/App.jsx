import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AdminCheckAuth from "./components/AdminCheckAuth";
import AdminLogin from "./pages/auth/login";
// import AdminAuthLayout from "./components/auth/layout";
import AdminLayout from "./components/Admin/layout";
import AdminHome from "./pages/Admin/home";
import { adminCheckAuth } from "./store/adminAuthSlice";
import AdminUsers from "./pages/admin/AdminUser";
import EditUserDialog from "./pages/admin/EditUserDialog";
import AdminProducts from "./pages/admin/AddProduct";
import AdminOrders from "./pages/admin/orders";
import AdminFeatures from "./pages/admin/features";
import AdminCategoryManager from "./pages/admin/AdminCategoryManager";
import AdminAuthLayout from "./components/auth/layout";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.adminAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminCheckAuth());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1>Loading</h1>
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
              <Navigate to="/admin/home" />
            ) : (
              <Navigate to="/auth/login" />
            )
          }
        />

        {/* Auth routes */}
        <Route
          path="/auth"
          element={
            <AdminCheckAuth isAuthenticated={isAuthenticated}>
              <AdminAuthLayout />
            </AdminCheckAuth>
          }
        >
          <Route path="login" element={<AdminLogin />} />
        </Route>


        <Route
          path="/admin"
          element={
            <AdminCheckAuth isAuthenticated={isAuthenticated}>
              <AdminLayout />
            </AdminCheckAuth>
          }
        >
          <Route path="home" element={<AdminHome />} />
          <Route path="user" element={<AdminUsers />} />
          <Route path="categories" element={<AdminCategoryManager />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />

        </Route>


        {/* 404 */}
        <Route path="*" element={<div className="text-white p-4">404 Not Found</div>} />
      </Routes>

      <Toaster richColors position="top-right" />
    </div>
  );
}

export default App;