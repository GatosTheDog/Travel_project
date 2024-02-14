import './App.css';
import { AppProvider } from './context/AppProvider'; // Ensure the path is correct
import AppRoutes from './navigation/AppRoutes';

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
