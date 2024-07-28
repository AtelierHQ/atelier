import { Route, Routes } from 'react-router-dom';
import { Layout } from '../components/layout';
import { AllIdeas } from '../modules';
import { SignupPage } from '../modules/authentication';
import { ProductRoadmap } from '../modules/product-roadmap';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ProductRoadmap />} />
        {/* {routes.map((route) => {
            const { path, routeComponent: Element } = route;
            return <Route key={path} path={path} element={<Element />} />;
          })} */}
        <Route path="all-ideas" element={<AllIdeas />} />
        <Route path="product-roadmap" element={<ProductRoadmap />} />
        <Route path="*" element={<div>404</div>} />
      </Route>
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
