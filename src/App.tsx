import "./App.css";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/homePage";
import Navbar from "./components/navbar";
import ProductsPage from "./pages/productsPage";
import ProductDetailPage from "./pages/productDetailPage";

function App() {
  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
