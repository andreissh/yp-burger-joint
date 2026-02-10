import "./App.css";
import React, { useEffect } from "react";
import Router from "./router/Router";
import { useAppDispatch, useAppSelector } from "./services/hooks";
import { checkAuth } from "./services/thunks/checkAuthThunk";
import Loader from "./shared/Loader/Loader";
import AppHeader from "./components/AppHeader/AppHeader";
import { getIngredients } from "./services/thunks/getIngredientsThunk";
import { setIngredients } from "./services/slices/ingredientsSlice";

function App() {
  const dispatch = useAppDispatch();
  const { isAuth, loading: loadingAuth } = useAppSelector(
    (state) => state.auth,
  );
  const { loading: loadingIngredients } = useAppSelector(
    (state) => state.ingredients,
  );

  useEffect(() => {
    try {
      dispatch(checkAuth());
    } catch (err) {
      console.error(err);
    }
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
  }, [dispatch, isAuth]);

  return (
    <div className="page-wrapper">
      <AppHeader />
      <main className="page-content">
        {loadingAuth || loadingIngredients ? <Loader /> : <Router />}
      </main>
    </div>
  );
}

export default App;
