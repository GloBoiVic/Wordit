import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './utils/theme-provider';
import AppLayout from './ui/AppLayout';
import Vocab from './features/vocab/Vocab';
import ErrorPage from './ui/ErrorPage';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <p>Error Page</p>,

    // Nested routes
    children: [
      {
        path: '/',
        element: <h1>Landing Page</h1>,
      },
      {
        path: '/vocab',
        element: <Vocab />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/vocab/:vocabId',
        element: <h1>Vocab card page</h1>,
      },
      {
        path: '*',
        element: <h1>Page not found</h1>,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
}

export default App;
