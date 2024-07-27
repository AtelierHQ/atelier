import { Route, Routes } from 'react-router-dom';
import { Layout } from '../components/layout';
import { AllIdeas } from '../modules';
import { routes } from '../utils';

export function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AllIdeas />} />
          {routes.map((route) => {
            const { path, routeComponent: Element } = route;
            return <Route path={path} element={<Element />} />;
          })}
        </Route>
      </Routes>
    </main>
  );
}

export default App;
