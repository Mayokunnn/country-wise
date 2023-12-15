import { useEffect, useReducer } from "react";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CountriesProvider } from "./contexts/CountriesContext";

function App() {
  return (
    <div className="app">
      <CountriesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/:name" element={<DetailsPage />}></Route>
          </Routes>
        </BrowserRouter>
      </CountriesProvider>
    </div>
  );
}

export default App;
