import React, { useEffect } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./services/store";
import Router from "./router/Router";
import { useAppDispatch, useAppSelector } from "./services/hooks";
import { checkAuth } from "./services/thunks/checkAuthThunk";
import Loader from "./shared/Loader/Loader";

const AppContent = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) return <Loader />;

  return <Router />;
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
