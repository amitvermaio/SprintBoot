import { CheckCircle, Loader2, Pencil, Save, Square, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const TodoItem = ({
  todo,
  onUpdate,
  onDelete,
  onToggle,
  updating,
  deleting,
}) => {
  const [editing, setEditing] = useState(false);
  const identifier = todo.id ?? todo._id ?? todo.todoId ?? todo.uuid ?? todo.title;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      title: todo.title ?? '',
      description: todo.description ?? '',
    },
  });

  useEffect(() => {
    reset({
      title: todo.title ?? '',
      description: todo.description ?? '',
    });
  }, [todo.title, todo.description, reset]);

  const handleToggleEdit = () => {
    if (editing) {
      reset();
    }
    setEditing((prev) => !prev);
  };

  const handleUpdate = async (values) => {
    const payload = {
      title: values.title.trim(),
      description: values.description.trim(),
    };

    await onUpdate(identifier, payload);
    setEditing(false);
  };

  const handleToggle = () => {
    onToggle(todo);
  };

  const handleDelete = () => {
    onDelete(identifier);
  };

  return (
    <li className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/30">
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={handleToggle}
          className="mt-1 rounded-full border border-transparent p-1 text-indigo-400 transition hover:text-indigo-300"
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {todo.completed ? <CheckCircle className="h-6 w-6" /> : <Square className="h-6 w-6" />}
        </button>
        <div className="flex-1">
          {editing ? (
            <form className="space-y-3" onSubmit={handleSubmit(handleUpdate)}>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300" htmlFor={`todo-title-${identifier}`}>
                  Title
                </label>
                <input
                  id={`todo-title-${identifier}`}
                  type="text"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
                  {...register('title', {
                    required: 'Title is required',
                    minLength: {
                      value: 3,
                      message: 'Title should be at least 3 characters',
                    },
                  })}
                />
                {errors.title?.message && (
                  <p className="text-xs text-rose-400">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300" htmlFor={`todo-description-${identifier}`}>
                  Description
                </label>
                <textarea
                  id={`todo-description-${identifier}`}
                  rows={3}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
                  {...register('description')}
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={!isDirty || updating}
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {updating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  <span>Save</span>
                </button>
                <button
                  type="button"
                  onClick={handleToggleEdit}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          ) : (
            <div>
              <h3 className="text-lg font-semibold text-slate-100">
                {todo.title}
              </h3>
              {todo.description && (
                <p className="mt-2 text-sm text-slate-300">{todo.description}</p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-1 ${
                    todo.completed ? 'bg-emerald-500/10 text-emerald-300' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {todo.completed ? 'Completed' : 'Pending'}
                </span>
                {todo.updatedAt && (
                  <span>Updated {new Date(todo.updatedAt).toLocaleString()}</span>
                )}
                {!todo.updatedAt && todo.createdAt && (
                  <span>Created {new Date(todo.createdAt).toLocaleString()}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        {!editing && (
          <button
            type="button"
            onClick={handleToggleEdit}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
          >
            <Pencil className="h-4 w-4" />
            <span>Edit</span>
          </button>
        )}
        <button
          type="button"
          onClick={handleDelete}
          className="inline-flex items-center gap-2 rounded-lg border border-rose-700/80 px-3 py-1.5 text-xs font-semibold text-rose-300 transition hover:border-rose-500 hover:bg-rose-500/15"
          disabled={deleting}
        >
          {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
          <span>Delete</span>
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
