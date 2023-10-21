import { Outlet } from 'react-router-dom';
import Header from './Header';

function AppLayout() {
  return (
    <div className="grid grid-rows-[auto_1fr] h-screen">
      <Header />

      <div className="mt-10">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
