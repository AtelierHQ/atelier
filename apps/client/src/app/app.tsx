import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/layout';
import { AllIdeas } from '../modules';
import { Login, Signup } from '../modules/authentication';
import { useAuthStore } from '../store';
import { routes } from '../utils';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export function App() {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      await checkAuth(); // Implement this in your auth store
      setIsLoading(false);
    };
    initAuth();
  }, [checkAuth]);

  if (isLoading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  return (
    <Routes>
      {isAuthenticated ? (
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AllIdeas />} />
          {routes.map((route) => {
            const { path, routeComponent: Element } = route;
            return <Route key={path} path={path} element={<Element />} />;
          })}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      ) : (
        <>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
}

export default App;
