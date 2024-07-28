import { Route, Routes } from 'react-router-dom';
import { Layout } from '../components/layout';
import { SignupPage } from '../modules/authentication';
import { ProductRoadmap } from '../modules/product-roadmap';
import { routes } from '../utils';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ProductRoadmap />} />
        {routes.map((route) => {
          const { path, routeComponent: Element } = route;
          return <Route key={path} path={path} element={<Element />} />;
        })}
        <Route path="*" element={<div>404</div>} />
      </Route>
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
