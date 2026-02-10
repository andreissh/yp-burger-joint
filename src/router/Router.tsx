import React from "react";
import { Route, Routes } from "react-router";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import Constructor from "../pages/Constructor/Constructor";
import Profile from "../pages/Profile/Profile";
import NotFound from "../pages/NotFound/NotFound";
import ProtectedRouteElement from "./ProtectedRouteElement";
import OrderHistory from "../components/Profile/OrderHistory/OrderHistory";

const Router = () => {
  return (
    <Routes>
      <Route
        index
        element={<ProtectedRouteElement element={<Constructor />} />}
      ></Route>
      <Route path="ingredients/:id" element={<Constructor />}></Route>

      <Route
        path="/profile"
        element={<ProtectedRouteElement element={<Profile />} onlyAuth />}
      ></Route>
      <Route
        path="/profile/orders"
        element={<ProtectedRouteElement element={<OrderHistory />} onlyAuth />}
      ></Route>

      <Route
        path="/login"
        element={<ProtectedRouteElement element={<Login />} onlyUnAuth />}
      ></Route>
      <Route
        path="/register"
        element={<ProtectedRouteElement element={<Register />} onlyUnAuth />}
      ></Route>
      <Route
        path="/forgot-password"
        element={
          <ProtectedRouteElement element={<ForgotPassword />} onlyUnAuth />
        }
      ></Route>
      <Route
        path="/reset-password"
        element={
          <ProtectedRouteElement
            element={<ResetPassword />}
            onlyUnAuth
            resetPasswordAllowed
          />
        }
      ></Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
