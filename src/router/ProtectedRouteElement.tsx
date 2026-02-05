import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../services/hooks";

type ProtectedRouteElementProps = {
  element: React.ReactElement;
  onlyAuth?: boolean;
  onlyUnAuth?: boolean;
  resetPasswordAllowed?: boolean;
};

const ProtectedRouteElement: React.FC<ProtectedRouteElementProps> = ({
  element,
  onlyAuth = false,
  onlyUnAuth = false,
  resetPasswordAllowed = false,
}) => {
  const { isAuth } = useAppSelector((store) => store.auth);
  const location = useLocation();

  if (isAuth && onlyUnAuth) {
    return <Navigate to="/" replace />;
  }

  if (!isAuth && onlyAuth) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (resetPasswordAllowed && !location.state?.fromForgotPassword) {
    return <Navigate to="/forgot-password" replace />;
  }

  return element;
};

export default ProtectedRouteElement;
