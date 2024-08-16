import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import DashboardEcommerce from "../pages/DashboardEcommerce";

//pages
import Starter from "../pages/Pages/Starter/Starter";
import Maintenance from "../pages/Pages/Maintenance/Maintenance";
import ComingSoon from "../pages/Pages/ComingSoon/ComingSoon";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

// User Profile
import UserProfile from "../pages/Authentication/user-profile";
import RegistrationTwo from "../pages/Authentication/RegistrationStep02";
import ConfirmOtp from "../pages/Authentication/ConfirmOtp";
import RoleAndPermission from "../pages/Pages/RoleAndPermission/RoleAndPermission";
import CustomerManagement from "../pages/Pages/User Mangement/CustomerManagement";
import StaffManagement from "../pages/Pages/User Mangement/StaffManagement";
import ProductManagement from "../pages/Pages/ProductManagement/ProductManagement";
import CategoryManagement from "../pages/Pages/CategoryManagement/CategoryManagement";
import AddProduct from "../pages/Pages/ProductManagement/AddProduct";
import UpdateProduct from "../pages/Pages/ProductManagement/UpdateProduct";

const authProtectedRoutes = [
  { path: "/dashboard", component: <DashboardEcommerce /> },
  { path: "/index", component: <DashboardEcommerce /> },

  //Pages
  { path: "/pages-starter", component: <Starter /> },

  //User Profile
  { path: "/profile", component: <UserProfile /> },

  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },

  { path: "/staff-management", component: <StaffManagement /> },

  { path: "/customer-management", component: <CustomerManagement /> },

  { path: "/role-permission-management", component: <RoleAndPermission /> },

  { path: "/product-management", component: <ProductManagement /> },
  { path: "/add-new-product", component: <AddProduct /> },
  { path: "/update-product", component: <UpdateProduct /> },

  { path: "/category-management", component: <CategoryManagement /> },
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/confirm-otp", component: <ConfirmOtp /> },
  { path: "/register", component: <Register /> },

  { path: "/pages-maintenance", component: <Maintenance /> },
  { path: "/pages-coming-soon", component: <ComingSoon /> },

  { path: "/login-next-step", component: <RegistrationTwo /> },
];

export { authProtectedRoutes, publicRoutes };
