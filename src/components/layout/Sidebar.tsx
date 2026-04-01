// src/components/layout/Sidebar.tsx
export const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <nav className="space-y-4">
        <a href="/dashboard" className="block text-green-400 font-bold">Overview</a>
        <a href="/dashboard/scores" className="block hover:text-green-400">My Scores</a>
      </nav>
    </aside>
  );
};
