import "./App.css";
import React, { useEffect } from "react";
import Router from "./router/Router";
import { useAppDispatch, useAppSelector } from "./services/hooks";
import { checkAuth } from "./services/thunks/checkAuthThunk";
import AppHeader from "./components/AppHeader/AppHeader";
import { getIngredients } from "./services/thunks/getIngredientsThunk";
import { setIngredients } from "./services/slices/ingredientsSlice";
import { PacmanLoader } from "react-spinners";

function App() {
  const dispatch = useAppDispatch();
  const { loading: loadingAuth } = useAppSelector((state) => state.auth);
  const { loading: loadingIngredients } = useAppSelector(
    (state) => state.ingredients,
  );
  const isLoading = loadingAuth || loadingIngredients;

  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(checkAuth());
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [dispatch]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await dispatch(getIngredients()).unwrap();
        dispatch(setIngredients(response));
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [dispatch]);

  return (
    <div className="page-wrapper">
      <AppHeader />
      <main className="page-content">
        {isLoading ? (
          <div className="loaderWrapper">
            <PacmanLoader color="var(--bg-color-white)" size={50} />
          </div>
        ) : (
          <Router />
        )}
      </main>
    </div>
  );
}

export default App;
