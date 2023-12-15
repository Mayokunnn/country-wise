import { createContext, useContext, useEffect, useReducer } from "react";

const CountriesContext = createContext();

const BASE_URL = "https://restcountries.com/v3.1";

function CountriesProvider({ children }) {
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

  async function getCountry(name) {
    try {
      dispatch({ type: "loading" });

      const res = await fetch(`${BASE_URL}/name/${name}?fullText=true`);
      const data = await res.json();

      console.log(data[0]);

      dispatch({ type: "countryFetched", payload: data[0] });
    } catch (err) {
      dispatch({ type: "fetchFailed" });
    }
  }

  const { countriesData, status, query, country } = state;

  return (
    <CountriesContext.Provider
      value={{
        dispatch,
        countries: countriesData,
        status,
        query,
        country,
        getCountry,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
}

function useCountries() {
  const context = useContext(CountriesContext);

  if (context === undefined)
    throw new Error("Context is being accessed outside provider");

  return context;
}

export { CountriesProvider, useCountries };
