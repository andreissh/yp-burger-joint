import "./App.css";
import React, { useEffect } from "react";
import Router from "./router/Router";
import { useAppDispatch, useAppSelector } from "./services/hooks";
import { checkAuth } from "./services/thunks/checkAuthThunk";
import Loader from "./shared/Loader/Loader";
import AppHeader from "./components/AppHeader/AppHeader";

function App() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    try {
      dispatch(checkAuth());
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  return (
    <div className="page-wrapper">
      <AppHeader />
      <main className="page-content">{loading ? <Loader /> : <Router />}</main>
    </div>
  );
}

export default App;
