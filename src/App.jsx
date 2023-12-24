import { lazy, Suspense } from "react";
// import DetailsPage from "./pages/DetailsPage/DetailsPage";
// import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CountriesProvider } from "./contexts/CountriesContext";
import Loader from "./components/Loader/Loader";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const DetailsPage = lazy(() => import("./pages/DetailsPage/DetailsPage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound/PageNotFound"));

function App() {
  return (
    <div className="app">
      <CountriesProvider>
        <BrowserRouter basename="">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/:name" element={<DetailsPage />}></Route>

              <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CountriesProvider>
    </div>
  );
}

export default App;
