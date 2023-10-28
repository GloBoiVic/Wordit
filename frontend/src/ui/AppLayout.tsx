import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Toaster } from 'react-hot-toast';

function AppLayout() {
  return (
    <div className="h-screen">
      <Header />

      <div className="mt-10 overflow-scroll">
        <Outlet />
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
        }}
      />
    </div>
  );
}

export default AppLayout;
