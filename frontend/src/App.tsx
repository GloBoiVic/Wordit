import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './utils/theme-provider';
import AppLayout from './ui/AppLayout';
import Vocab from './features/vocab/Vocab';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <p>Error Page</p>,

    // Nested routes
    children: [
      {
        path: '/',
        element: <p>Landing Page</p>,
      },
      {
        path: '/vocab',
        element: <Vocab />,
        errorElement: <p>Error page</p>,
      },
      {
        path: '/vocab/:vocabId',
        element: <p>Vocab card page</p>,
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
