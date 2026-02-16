import { useState } from 'react';
import { Loader2, RefreshCcw } from 'lucide-react';
import TodoComposer from '../../components/todo/TodoComposer.jsx';
import TodoList from '../../components/todo/TodoList.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTodos } from '../../context/TodoContext.jsx';

const resolveId = (todoOrId) => {
  if (typeof todoOrId === 'string') {
    return todoOrId;
  }

  if (!todoOrId) {
    return null;
  }

  return todoOrId.id ?? todoOrId._id ?? todoOrId.todoId ?? todoOrId.uuid ?? null;
};

const TodoDashboard = () => {
  const { user } = useAuth();
  const {
    todos,
    todoLoading,
    todoError,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodoCompletion,
  } = useTodos();
  const [creating, setCreating] = useState(false);
  const [updatingIds, setUpdatingIds] = useState(new Set());
  const [deletingIds, setDeletingIds] = useState(new Set());

  const displayName = user?.name ?? user?.username ?? user?.email ?? 'there';

  const addUpdatingId = (id) => {
    if (!id) return;
    setUpdatingIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const removeUpdatingId = (id) => {
    if (!id) return;
    setUpdatingIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const addDeletingId = (id) => {
    if (!id) return;
    setDeletingIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const removeDeletingId = (id) => {
    if (!id) return;
    setDeletingIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleCreateTodo = async (payload) => {
    setCreating(true);
    try {
      await createTodo(payload);
    } catch (error) {
      console.error('Failed to create todo', error);
    } finally {
      setCreating(false);
    }
  };

  const handleUpdateTodo = async (id, updates) => {
    const normalizedId = resolveId(id);
    addUpdatingId(normalizedId);
    try {
      await updateTodo(normalizedId, updates);
    } catch (error) {
      console.error('Failed to update todo', error);
    } finally {
      removeUpdatingId(normalizedId);
    }
  };

  const handleToggleTodo = async (todo) => {
    const normalizedId = resolveId(todo);
    addUpdatingId(normalizedId);
    try {
      await toggleTodoCompletion(todo);
    } catch (error) {
      console.error('Failed to toggle todo', error);
    } finally {
      removeUpdatingId(normalizedId);
    }
  };

  const handleDeleteTodo = async (id) => {
    const normalizedId = resolveId(id);
    addDeletingId(normalizedId);
    try {
      await deleteTodo(normalizedId);
    } catch (error) {
      console.error('Failed to delete todo', error);
    } finally {
      removeDeletingId(normalizedId);
    }
  };

  const handleRefresh = async () => {
    try {
      await fetchTodos();
    } catch (error) {
      console.error('Failed to refresh todos', error);
    }
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/30 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-indigo-400">Hello, {displayName}</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-50">Stay on top of your todos</h1>
          <p className="mt-1 text-sm text-slate-400">
            Create tasks, mark them complete, and keep your workflow under control.
          </p>
        </div>
        <button
          type="button"
          onClick={handleRefresh}
          className="inline-flex items-center gap-2 self-start rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-indigo-500 hover:bg-indigo-500/10"
          disabled={todoLoading}
        >
          {todoLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
          <span>Refresh</span>
        </button>
      </div>

      {todoError && (
        <div className="rounded-lg border border-rose-700/60 bg-rose-950/40 px-4 py-3 text-sm text-rose-200">
          {todoError}
        </div>
      )}

      <TodoComposer onCreate={handleCreateTodo} submitting={creating} />

      <TodoList
        todos={todos}
        loading={todoLoading}
        onUpdate={handleUpdateTodo}
        onDelete={handleDeleteTodo}
        onToggle={handleToggleTodo}
        updatingIds={updatingIds}
        deletingIds={deletingIds}
      />
    </section>
  );
};

export default TodoDashboard;
