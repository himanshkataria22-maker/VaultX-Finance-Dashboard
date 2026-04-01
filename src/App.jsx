import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/ui/Layout';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { Insights } from './pages/Insights';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="insights" element={<Insights />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}

export default App;
