import { Loader2, PlusCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

const TodoComposer = ({ onCreate, submitting }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = async (values) => {
    const payload = {
      title: values.title.trim(),
      description: values.description.trim(),
    };

    await onCreate(payload);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/30"
    >
      <h2 className="text-lg font-semibold text-slate-100">Create todo</h2>
      <p className="mt-1 text-sm text-slate-400">Add a title and optional description for your next task.</p>

      <div className="mt-4 space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-200" htmlFor="todo-title">
            Title
          </label>
          <input
            id="todo-title"
            type="text"
            placeholder="Plan sprint backlog"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
            {...register('title', {
              required: 'Title is required',
              minLength: {
                value: 3,
                message: 'Title should be at least 3 characters long',
              },
            })}
          />
          {errors.title?.message && <p className="text-xs text-rose-400">{errors.title.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-200" htmlFor="todo-description">
            Description
          </label>
          <textarea
            id="todo-description"
            rows={3}
            placeholder="Optional details to remember"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
            {...register('description')}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={submitting}
      >
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlusCircle className="h-4 w-4" />}
        <span>Add todo</span>
      </button>
    </form>
  );
};

export default TodoComposer;
