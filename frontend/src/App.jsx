import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';
import DocumentPage from './components/pages/DocumentPage';
import AdminPage from './components/pages/AdminPage';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-[#ef233c] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            !user ? <LoginPage /> : <Navigate to="/dashboard" replace />
          }
        />

        <Route
          path="/dashboard"
          element={
            user ? <DashboardPage /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/document/:id"
          element={
            user ? <DocumentPage /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/admin"
          element={
            user?.role === 'admin' ? (
              <AdminPage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;