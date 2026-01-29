import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import ResetPassword from "../components/ResetPassword/ResetPassword";
import Constructor from "../components/Constructor/Constructor";
import Profile from "../components/Profile/Profile";
import AppLayout from "../layout/AppLayout/AppLayout";
import AuthLayout from "../layout/AuthLayout/AuthLayout";
import NotFound from "../components/NotFound/NotFound";
import ProtectedRouteElement from "./ProtectedRouteElement";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            index
            element={
              <ProtectedRouteElement
                element={<Constructor />}
                onlyAuth={true}
              />
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement element={<Profile />} onlyAuth={true} />
            }
          ></Route>
          <Route path="ingredients/:id" element={<Constructor />}></Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              <ProtectedRouteElement element={<Login />} onlyUnAuth={true} />
            }
          ></Route>
          <Route
            path="/register"
            element={
              <ProtectedRouteElement element={<Register />} onlyUnAuth={true} />
            }
          ></Route>
          <Route
            path="/forgot-password"
            element={
              <ProtectedRouteElement
                element={<ForgotPassword />}
                onlyUnAuth={true}
              />
            }
          ></Route>
          <Route
            path="/reset-password"
            element={
              <ProtectedRouteElement
                element={<ResetPassword />}
                onlyUnAuth={true}
                resetPasswordAllowed={true}
              />
            }
          ></Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
