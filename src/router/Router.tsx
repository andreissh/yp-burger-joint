import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import ResetPassword from "../components/ResetPassword/ResetPassword";
import Constructor from "../components/Constructor/Constructor";
import IngredientPage from "../components/IngredientPage/IngredientPage";
import Profile from "../components/Profile/Profile";
import { useAppSelector } from "../services/hooks";
import AppLayout from "../layout/AppLayout/AppLayout";
import AuthLayout from "../layout/AuthLayout/AuthLayout";
import NotFound from "../components/NotFound/NotFound";

const Router = () => {
  const { isAuth } = useAppSelector((store) => store.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            index
            element={
              isAuth ? <Constructor /> : <Navigate to="/login" replace />
            }
          ></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="ingredients/:id" element={<IngredientPage />}></Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={isAuth ? <Navigate to="/" replace /> : <Login />}
          ></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
