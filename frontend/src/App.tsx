import { ThemeProvider } from './utils/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <h1>Hello World</h1>
    </ThemeProvider>
  );
}

export default App;
