import { Suspense, useEffect } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Loader } from "lucide-react";

import ErrorBoundary from "@/shared/components/system/ErrorBoundary";
import { checkAuthState } from "./redux/slices/auth";

import ProductsRoot from "@/modules/products";
import AuthRoot from "@/modules/auth";
import CartRoot from "@/modules/cart";
import AboutRoot from "@/modules/about";
import ContactRoot from "@/modules/contact";
import AppLayout from "./shared/components/AppLayout";
import { RootState } from "./redux/store";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isInitialized } = useSelector(
    (state: RootState) => state.auth,
  );
  const location = useLocation();

  if (!isInitialized) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

function App() {
  const dispatch = useDispatch();
  const { isInitialized } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex h-screen w-screen items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        }
      >
        <ErrorBoundary>
          <AppLayout>
            <Routes>
              <Route path="auth/*" element={<AuthRoot />} />
              <Route path="about" element={<AboutRoot />} />
              <Route path="contact" element={<ContactRoot />} />

              <Route
                path="products/*"
                element={
                  <ProtectedRoute>
                    <ProductsRoot />
                  </ProtectedRoute>
                }
              />
              <Route
                path="cart/*"
                element={
                  <ProtectedRoute>
                    <CartRoot />
                  </ProtectedRoute>
                }
              />

              <Route path="/" element={<Navigate to="/products" />} />
              <Route path="*" element={<Navigate to="/products" />} />
            </Routes>
          </AppLayout>
        </ErrorBoundary>
      </Suspense>
    </Router>
  );
}

export default App;
