import React from "react";
import "./App.css";
import AppHeader from "./components/AppHeader/AppHeader";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="page-wrapper">
      <AppHeader />
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
