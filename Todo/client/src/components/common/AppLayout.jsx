import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Navbar from './Navbar.jsx';

const AppLayout = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {isAuthenticated && <Navbar />}
      <main className="mx-auto w-full max-w-4xl px-4 py-6 lg:py-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
