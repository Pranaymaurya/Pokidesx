import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { PokemonProvider } from './contexts/PokemonContext';
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';
import Favorites from './pages/Favorites';
import Comparison from './pages/Comparison';
import Navbar from './components/Navbar';
import ErrorFallback from './components/ErrorFallback';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // 1 hour
      retry: 1,
    },
  },
});

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <PokemonProvider>
          <Router>
            <div className="min-h-screen bg-gray-100">
              <Navbar />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<PokemonList />} />
                  <Route path="/pokemon/:id" element={<PokemonDetail />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/comparison" element={<Comparison />} />
                </Routes>
              </main>
            </div>
          </Router>
        </PokemonProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;