import "./App.css";
import { ROUTES } from "./routes/routes";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/login";
import HomePage from "./pages/homePage";
import Navbar from "./components/navbar";
import RegisterPage from "./pages/register";
import PublicRoute from "./routes/publicRoute";
import ProductsPage from "./pages/productsPage";
import ProtectedRoute from "./routes/protectedRoute";
import ProductDetailPage from "./pages/productDetailPage";

function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <div className="pt-20">
        <Routes>
          {/* Public Pages */}
          <Route
            path={ROUTES.LOGIN}
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path={ROUTES.REGISTER}
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          <Route
            path={ROUTES.HOME}
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.PRODUCTS}
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.PRODUCT_DETAIL}
            element={
              <ProtectedRoute>
                <ProductDetailPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
