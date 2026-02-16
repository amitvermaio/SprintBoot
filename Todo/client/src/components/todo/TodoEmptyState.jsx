import { ClipboardList } from 'lucide-react';

const TodoEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-10 text-center text-slate-400">
      <ClipboardList className="h-12 w-12 text-slate-600" />
      <h3 className="mt-4 text-lg font-semibold text-slate-200">Your queue is clear</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-400">
        Create your first todo and start tracking the tasks that matter most.
      </p>
    </div>
  );
};

export default TodoEmptyState;
