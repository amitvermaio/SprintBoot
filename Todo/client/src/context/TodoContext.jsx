import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  createTodoRequest,
  deleteTodoRequest,
  getTodosRequest,
  updateTodoRequest,
} from '../api/todo.js';
import { useAuth } from './AuthContext';

const TodoContext = createContext(undefined);

export const TodoProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [todos, setTodos] = useState([]);
  const [todoLoading, setTodoLoading] = useState(false);
  const [todoError, setTodoError] = useState(null);

  const setErrorMessage = useCallback((error, fallbackMessage) => {
    const message = error.response?.data?.message || error.message || fallbackMessage;
    setTodoError(message);
  }, []);

  const fetchTodos = useCallback(async () => {
    if (!isAuthenticated) {
      setTodos([]);
      setTodoLoading(false);
      return [];
    }

    setTodoLoading(true);
    setTodoError(null);

    try {
      const response = await getTodosRequest();
      const list = Array.isArray(response.data) ? response.data : response.data?.todos ?? [];
      setTodos(list);
      return list;
    } catch (error) {
      setErrorMessage(error, 'Unable to load todos.');
      throw error;
    } finally {
      setTodoLoading(false);
    }
  }, [isAuthenticated, setErrorMessage]);

  const createTodo = useCallback(
    async (payload) => {
      setTodoError(null);

      try {
        const response = await createTodoRequest(payload);
        const created = response.data?.todo ?? response.data;

        if (created && typeof created === 'object') {
          setTodos((prev) => [created, ...prev]);
          return created;
        }

        await fetchTodos();
        return created;
      } catch (error) {
        setErrorMessage(error, 'Unable to create todo.');
        throw error;
      }
    },
    [setErrorMessage, fetchTodos],
  );

  const updateTodo = useCallback(
    async (id, updates) => {
      setTodoError(null);

      try {
        const response = await updateTodoRequest(id, updates);
        const updated = response.data?.todo ?? response.data ?? {};
        const identifier = updated.id ?? updated._id ?? updated.todoId ?? id;
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === identifier || todo._id === identifier || todo.todoId === identifier
              ? { ...todo, ...updated }
              : todo,
          ),
        );
        return { ...updates, ...updated, id: identifier };
      } catch (error) {
        setErrorMessage(error, 'Unable to update todo.');
        throw error;
      }
    },
    [setErrorMessage],
  );

  const deleteTodo = useCallback(
    async (id) => {
      setTodoError(null);

      try {
        await deleteTodoRequest(id);
        setTodos((prev) =>
          prev.filter(
            (todo) => todo.id !== id && todo._id !== id && todo.todoId !== id && todo.uuid !== id,
          ),
        );
      } catch (error) {
        setErrorMessage(error, 'Unable to delete todo.');
        throw error;
      }
    },
    [setErrorMessage],
  );

  const toggleTodoCompletion = useCallback(
    async (todo) => {
      const next = { ...todo, completed: !todo.completed };
      await updateTodo(todo.id, { completed: next.completed });
    },
    [updateTodo],
  );

  useEffect(() => {
    if (!isAuthenticated) {
      setTodos([]);
      return;
    }

    let cancelled = false;

    const load = async () => {
      try {
        await fetchTodos();
      } catch (error) {
        if (!cancelled) {
          console.error('Failed to load todos', error);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, fetchTodos]);

  const value = useMemo(
    () => ({
      todos,
      todoLoading,
      todoError,
      fetchTodos,
      createTodo,
      updateTodo,
      deleteTodo,
      toggleTodoCompletion,
    }),
    [todos, todoLoading, todoError, fetchTodos, createTodo, updateTodo, deleteTodo, toggleTodoCompletion],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodos = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodos must be used inside a TodoProvider');
  }

  return context;
};
