import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignupPage from './features/user/SignupPage';
import Vocab from './features/vocab/Vocab';
import AppLayout from './ui/AppLayout';
import ErrorPage from './ui/ErrorPage';
import { ThemeProvider } from './utils/theme-provider';
import LoginPage from './features/user/LoginPage';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0, // automatically refetches the data
    },
  },
});

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
        path: '/users/signup',
        element: <SignupPage />,
      },
      {
        path: '/users/login',
        element: <LoginPage />,
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
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
