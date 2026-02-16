import { Loader2, UserPlus } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AuthCard from '../../components/auth/AuthCard.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const RegisterPage = () => {
  const {
    register: registerField,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const {
    register: registerUser,
    isAuthenticated,
    authLoading,
    authError,
    clearAuthError,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    return () => clearAuthError();
  }, [clearAuthError]);

  if (isAuthenticated) {
    return <Navigate to="/todos" replace />;
  }

  const onSubmit = async ({ name, email, password }) => {
    try {
      await registerUser({ name, email, password });
      reset();
      navigate('/todos', { replace: true });
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const passwordValue = watch('password');

  return (
    <AuthCard
      title="Create account"
      subtitle="Start organizing your tasks in minutes"
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-200" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50"
            placeholder="Your name"
            {...registerField('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name should be at least 2 characters',
              },
            })}
            onInput={clearAuthError}
          />
          {errors.name?.message && <p className="text-xs text-rose-400">{errors.name.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-200" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50"
            placeholder="you@example.com"
            {...registerField('email', {
              required: 'Email is required',
              pattern: {
                value: /.+@.+\..+/,
                message: 'Enter a valid email address',
              },
            })}
            onInput={clearAuthError}
          />
          {errors.email?.message && <p className="text-xs text-rose-400">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-200" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50"
            placeholder="Create a strong password"
            {...registerField('password', {
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

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-200" htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50"
            placeholder="Repeat password"
            {...registerField('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === passwordValue || 'Passwords do not match',
            })}
            onInput={clearAuthError}
          />
          {errors.confirmPassword?.message && (
            <p className="text-xs text-rose-400">{errors.confirmPassword.message}</p>
          )}
        </div>

        {authError && <p className="text-sm text-rose-400">{authError}</p>}

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={authLoading}
        >
          {authLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
          <span>Register</span>
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Already have an account?{' '}
        <Link className="font-medium text-indigo-400 underline-offset-4 hover:text-indigo-300 hover:underline" to="/login">
          Login instead
        </Link>
      </p>
    </AuthCard>
  );
};

export default RegisterPage;
