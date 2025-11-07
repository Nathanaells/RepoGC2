import "./css/home.css";
import HomePage from "./views/HomePage";
import DetailProduct from "./views/DetailProduct";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<HomePage />} />
            <Route path="/detail/:id" element={<DetailProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
