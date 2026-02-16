import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="mt-20 text-center">
      <p className="text-6xl font-bold text-slate-700">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-slate-200">Page not found</h1>
      <p className="mt-2 text-sm text-slate-400">
        The page you are looking for does not exist or was moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
      >
        Go home
      </Link>
    </div>
  );
};

export default NotFound;
