import React from "react";
import { Provider } from "react-redux";
import { store } from "./services/store";
import Router from "./router/Router";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
