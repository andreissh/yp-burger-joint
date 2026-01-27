import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import ResetPassword from "../components/ResetPassword/ResetPassword";
import Constructor from "../components/Constructor/Constructor";
import App from "../App";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Constructor />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
