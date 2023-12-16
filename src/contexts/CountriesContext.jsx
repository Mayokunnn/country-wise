import { createContext, useContext, useEffect, useReducer } from "react";

const CountriesContext = createContext();

const BASE_URL = "https://restcountries.com/v3.1";

const initialState = {
  initialData: [],
  countriesData: [],
  status: "loading",
  query: "",
  country: [],
  region: "",
};

function CountriesProvider({ children }) {
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
          newQuery.length > 0
            ? state.initialData.filter((country) =>
                country.name.common
                  .toLowerCase()
                  .includes(newQuery.toLowerCase())
              )
            : state.initialData;
        const newStatus = newData.length ? "ready" : "error";
        return {
          ...state,
          query: newQuery,
          status: newStatus,
          countriesData: newData || state.initialData,
        };
      case "countryFetched":
        return { ...state, country: action.payload, status: "ready" };
      case "countryFiltered":
        const newCountryData =
          action.payload !== "all"
            ? state.initialData.filter(
                (country) => country.region.toLowerCase() === action.payload
              )
            : state.initialData;

        return {
          ...state,
          countriesData: newCountryData,
          region: action.payload,
          status: "ready",
        };
      default:
        return { ...state, initialState };
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

      dispatch({ type: "countryFetched", payload: data[0] });
    } catch (err) {
      dispatch({ type: "fetchFailed" });
    }
  }

  function getRegionCountries(e) {
    dispatch({ type: "countryFiltered", payload: e.target.value });
  }

  const { countriesData, status, query, country, region, initialData } = state;

  return (
    <CountriesContext.Provider
      value={{
        dispatch,
        countries: countriesData,
        allCountries: initialData,
        status,
        query,
        country,
        getCountry,
        getRegionCountries,
        region,
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
