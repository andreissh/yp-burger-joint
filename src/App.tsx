import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./services/store";
import Router from "./router/Router";
import { useAppDispatch } from "./services/hooks";
import { checkAuth } from "./services/thunks/checkAuthThunk";
import "./App.css";

const AppContent = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

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
