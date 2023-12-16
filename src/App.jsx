import DetailsPage from "./pages/DetailsPage/DetailsPage";
import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CountriesProvider } from "./contexts/CountriesContext";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import CountryDetails from "./components/CountryDetails/CountryDetails";

function App() {
  return (
    <div className="app">
      <CountriesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="detail" element={<DetailsPage />}>
              <Route path=":name" element={<CountryDetails />}></Route>
            </Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </CountriesProvider>
    </div>
  );
}

export default App;
