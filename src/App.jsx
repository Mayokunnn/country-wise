import { useEffect, useReducer } from "react";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const BASE_URL = "https://restcountries.com/v3.1";

function App() {
  const initialState = {
    initialData: [],
    countriesData: [],
    status: "ready",
    query: "",
    country: [],
  };

  function reducer(state, action) {
    switch (action.type) {
      case "dataFetched":
        return {
          ...state,
          countriesData: action.payload,
          initialData: action.payload,
          status: "ready",
        };
      case "loading":
        return { ...state, status: "loading" };
      case "fetchFailed":
        return { ...state, status: "error" };
      case "search":
        const newQuery = action.payload;
        const newData =
          newQuery.length > 1
            ? state.countriesData.filter((country) =>
                country.name.common
                  .toLowerCase()
                  .includes(newQuery.toLowerCase())
              )
            : state.initialData;
        return {
          ...state,
          query: newQuery,
          countriesData: newData || state.initialData,
        };
      case "countryFetched":
        return { ...state, country: action.payload, status: "ready" };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getCountries() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/all`);
        const data = await res.json();

        const countryData = data.flatMap((innerArr) => innerArr);

        dispatch({ type: "dataFetched", payload: countryData });
      } catch (err) {
        dispatch({ type: "fetchFailed" });
      }
    }

    getCountries();
  }, [dispatch]);

  const { countriesData, status, query, country } = state;

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                countries={countriesData}
                status={status}
                dispatch={dispatch}
                query={query}
              />
            }
          ></Route>
          <Route
            path="/:name"
            element={
              <DetailsPage
                BASE_URL={BASE_URL}
                dispatch={dispatch}
                country={country}
                status={status}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
