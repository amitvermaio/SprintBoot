const AuthCard = ({ title, subtitle, children }) => {
  return (
    <div className="mx-auto mt-16 w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-lg shadow-slate-950/40">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-slate-50">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-slate-400">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
};

export default AuthCard;
