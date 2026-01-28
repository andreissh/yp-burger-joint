import { useEffect } from "react";
import { useNavigate } from "react-router";

export const useResetPassword = () => {
  const navigate = useNavigate();

  const allowResetPassword = () => {
    localStorage.setItem("resetPasswordAllowed", "true");
  };

  const disallowResetPassword = () => {
    localStorage.removeItem("resetPasswordAllowed");
  };

  const checkResetPasswordAccess = () => {
    const isAllowed = localStorage.getItem("resetPasswordAllowed") === "true";
    if (!isAllowed) {
      navigate("/forgot-password");
    }
  };

  useEffect(() => {
    return () => disallowResetPassword();
  }, []);

  return {
    allowResetPassword,
    disallowResetPassword,
    checkResetPasswordAccess,
  };
};
