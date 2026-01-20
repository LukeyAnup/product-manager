import "./App.css";
import { ROUTES } from "./routes/routes";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { FavouritesProvider } from "./context/favouritesContext";

import Cart from "./pages/cart";
import LoginPage from "./pages/login";
import HomePage from "./pages/homePage";
import Navbar from "./components/navbar";
import RegisterPage from "./pages/register";
import PublicRoute from "./routes/publicRoute";
import ProductsPage from "./pages/productsPage";
import ProtectedRoute from "./routes/protectedRoute";
import CheckoutHistory from "./pages/checkoutHistory";
import ProductDetailPage from "./pages/productDetailPage";

function App() {
  return (
    <AuthProvider>
      <FavouritesProvider>
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
            <Route
              path={ROUTES.CART}
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.CHECKOUT_HISTORY}
              element={
                <ProtectedRoute>
                  <CheckoutHistory />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </FavouritesProvider>
    </AuthProvider>
  );
}

export default App;
