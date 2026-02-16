import { LogIn, Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import AuthCard from '../../components/auth/AuthCard.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const LoginPage = () => {
  const {
    login,
    isAuthenticated,
    authLoading,
    authError,
    clearAuthError,
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    return () => clearAuthError();
  }, [clearAuthError]);

  if (isAuthenticated) {
    return <Navigate to="/todos" replace />;
  }

  const onSubmit = async (formValues) => {
    try {
      await login(formValues);
      reset();
      const redirectPath = location.state?.from?.pathname ?? '/todos';
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Login to manage your tasks"
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-200" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50"
            placeholder="you@example.com"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /.+@.+\..+/, // Basic email pattern
                message: 'Enter a valid email address',
              },
            })}
            onInput={clearAuthError}
          />
          {errors.email?.message && (
            <p className="text-xs text-rose-400">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-200" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50"
            placeholder="Your password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            onInput={clearAuthError}
          />
          {errors.password?.message && (
            <p className="text-xs text-rose-400">{errors.password.message}</p>
          )}
        </div>

        {authError && <p className="text-sm text-rose-400">{authError}</p>}

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={authLoading}
        >
          {authLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
          <span>Login</span>
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Do not have an account?{' '}
        <Link className="font-medium text-indigo-400 underline-offset-4 hover:text-indigo-300 hover:underline" to="/register">
          Register now
        </Link>
      </p>
    </AuthCard>
  );
};

export default LoginPage;
