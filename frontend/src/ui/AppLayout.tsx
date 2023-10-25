import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Toaster } from 'react-hot-toast';

function AppLayout() {
  return (
    <div className="h-screen">
      <Header />

      <div className="mt-10">
        <Outlet />
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default AppLayout;
