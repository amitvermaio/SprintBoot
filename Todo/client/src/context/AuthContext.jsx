import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { loginRequest, registerRequest } from '../api/auth.js';

const TOKEN_STORAGE_KEY = 'Todo_Token';
const USER_STORAGE_KEY = 'Todo_User';

const AuthContext = createContext(undefined);

const parseStoredUser = () => {
  const storedRaw = localStorage.getItem(USER_STORAGE_KEY);

  if (!storedRaw) {
    return null;
  }

  try {
    return JSON.parse(storedRaw);
  } catch (error) {
    console.warn('Failed to parse stored user payload', error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY));
  const [user, setUser] = useState(() => parseStoredUser());
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const persistAuth = useCallback((nextToken, nextUser) => {
    if (nextToken) {
      localStorage.setItem(TOKEN_STORAGE_KEY, nextToken);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }

    if (nextUser) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, []);

  const login = useCallback(async (credentials) => {
    setAuthLoading(true);
    setAuthError(null);

    try {
      const response = await loginRequest(credentials);
      const { token: nextToken, user: nextUser } = response.data;

      if (!nextToken) {
        throw new Error('Token missing from login response');
      }

      setToken(nextToken);
      setUser(nextUser ?? null);
      persistAuth(nextToken, nextUser ?? null);

      return { token: nextToken, user: nextUser ?? null };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Unable to login, please try again.';

      setAuthError(message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  }, [persistAuth]);

  const register = useCallback(async (payload) => {
    setAuthLoading(true);
    setAuthError(null);

    try {
      const response = await registerRequest(payload);
      const { token: nextToken, user: nextUser } = response.data;

      if (!nextToken) {
        throw new Error('Token missing from register response');
      }

      setToken(nextToken);
      setUser(nextUser ?? null);
      persistAuth(nextToken, nextUser ?? null);

      return { token: nextToken, user: nextUser ?? null };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Unable to register, please try again.';

      setAuthError(message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  }, [persistAuth]);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    persistAuth(null, null);
  }, [persistAuth]);

  const clearAuthError = useCallback(() => {
    setAuthError(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      authLoading,
      authError,
      login,
      register,
      logout,
      clearAuthError,
    }),
    [token, user, authLoading, authError, login, register, logout, clearAuthError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }

  return context;
};
