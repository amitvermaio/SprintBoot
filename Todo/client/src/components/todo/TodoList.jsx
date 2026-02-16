import { Loader2 } from 'lucide-react';
import TodoEmptyState from './TodoEmptyState.jsx';
import TodoItem from './TodoItem.jsx';

const normalizeIds = (ids) => {
  if (!ids) {
    return new Set();
  }

  if (ids instanceof Set) {
    return ids;
  }

  if (Array.isArray(ids)) {
    return new Set(ids);
  }

  return new Set([ids]);
};

const resolveId = (todo) => todo.id ?? todo._id ?? todo.todoId ?? todo.uuid ?? todo.title;

const TodoList = ({
  todos,
  loading,
  onUpdate,
  onDelete,
  onToggle,
  updatingIds,
  deletingIds,
}) => {
  const updatingSet = normalizeIds(updatingIds);
  const deletingSet = normalizeIds(deletingIds);

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
      </div>
    );
  }

  if (!todos?.length) {
    return <TodoEmptyState />;
  }

  return (
    <ul className="space-y-4">
      {todos.map((todo) => {
        const id = resolveId(todo);
        return (
          <TodoItem
            key={id}
            todo={todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onToggle={onToggle}
            updating={updatingSet.has(id)}
            deleting={deletingSet.has(id)}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
