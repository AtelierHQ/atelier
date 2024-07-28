import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

type Props = {
  children?: React.ReactNode;
};

const Layout = (props: Props) => {
  return (
    <div className="h-screen max-w-full flex ">
      <Sidebar />

      <div className="flex-1  overflow-y-hidden">
        <Header />

        <div className="overflow-x-auto">
          <main className="flex-1 p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export { Layout };
