import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import Constructor from "../pages/Constructor/Constructor";
import Profile from "../pages/Profile/Profile";
import NotFound from "../pages/NotFound/NotFound";
import ProtectedRouteElement from "./ProtectedRouteElement";
import OrderHistory from "../components/Profile/OrderHistory/OrderHistory";
import Modal from "../shared/Modal/Modal";
import IngredientDetails from "../shared/IngredientDetails/IngredientDetails";
import IngredientPage from "../pages/IngredientPage/IngredientPage";
import { useAppDispatch } from "../services/hooks";
import { removeCurrentIngredient } from "../services/slices/ingredientCurrentSlice";
import { useModal } from "../hooks/useModal";

const Router = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { closeModal } = useModal();
  const background = location.state?.background;

  const handleCloseIngredientDetailsModal = () => {
    dispatch(removeCurrentIngredient());
    navigate(-1);
    closeModal();
  };

  return (
    <>
      <Routes location={background || location}>
        <Route
          index
          element={<ProtectedRouteElement element={<Constructor />} />}
        ></Route>
        <Route path="ingredients/:id" element={<IngredientPage />}></Route>

        <Route
          path="/profile"
          element={<ProtectedRouteElement element={<Profile />} onlyAuth />}
        ></Route>
        <Route
          path="/profile/orders"
          element={
            <ProtectedRouteElement element={<OrderHistory />} onlyAuth />
          }
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

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal
                title="Детали ингредиента"
                onClose={handleCloseIngredientDetailsModal}
              >
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default Router;
