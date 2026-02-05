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
}) => {
  const { isAuth } = useAppSelector((store) => store.auth);
  const location = useLocation();

  if (onlyUnAuth && isAuth) {
    const from = location.state?.from || "/";
    return <Navigate to={from} replace />;
  }

  if (onlyAuth && !isAuth) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return element;
};

export default ProtectedRouteElement;
