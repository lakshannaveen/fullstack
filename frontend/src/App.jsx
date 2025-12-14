import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import { AuthProvider } from './context/AuthProvider';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function AppContent() {
  const { loading } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState('home');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Simple routing based on URL
    const handleRouteChange = () => {
      const path = window.location.pathname;
      if (path === '/login') setCurrentPage('login');
      else if (path === '/register') setCurrentPage('register');
      else setCurrentPage('home');
    };

    handleRouteChange();
    window.addEventListener('popstate', handleRouteChange);

    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  // Override history for navigation
  useEffect(() => {
    const originalPushState = window.history.pushState;
    window.history.pushState = function (...args) {
      originalPushState.apply(window.history, args);
      const newPath = args[2];
      if (newPath === '/login') setCurrentPage('login');
      else if (newPath === '/register') setCurrentPage('register');
      else setCurrentPage('home');
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-2xl text-white">Loading...</div>
      </div>
    );
  }

  // If not logged in, only show login/register
  if (!user) {
    return (
      <>
        {currentPage === 'login' && <Login />}
        {currentPage === 'register' && <Register />}
        {currentPage !== 'login' && currentPage !== 'register' && <Login />}
      </>
    );
  }

  return (
    <>
      {currentPage === 'login' && <Login />}
      {currentPage === 'register' && <Register />}
      {currentPage === 'home' && <Home />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
