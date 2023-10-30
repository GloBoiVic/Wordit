import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import Header from './Header';

function AppLayout() {
  return (
    <div className="h-screen">
      <Header />

      {/* TODO: Add guard clause. If there is no user, then navigate to /login to protect main route */}
      <div className="mt-10">
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
