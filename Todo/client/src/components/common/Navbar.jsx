import { ListTodo, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const displayName = user?.name ?? user?.username ?? user?.email;
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    if (location.pathname !== '/login') {
      navigate('/login');
    }
  };

  return (
    <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-4">
        <Link to="/todos" className="flex items-center gap-2 text-lg font-semibold tracking-wide">
          <ListTodo className="h-6 w-6" />
          <span>Todo Dashboard</span>
        </Link>
        <div className="flex items-center gap-4">
          {displayName && <span className="text-sm text-slate-300">{displayName}</span>}
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-3 py-1.5 text-sm font-medium text-slate-100 transition hover:border-slate-500 hover:bg-slate-800"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
