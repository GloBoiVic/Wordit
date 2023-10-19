import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import { ThemeProvider } from './utils/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="container font-Cormorant Infant">
        <Header />
        <HomePage />
      </div>
    </ThemeProvider>
  );
}

export default App;
