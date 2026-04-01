import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, Lightbulb, Wallet } from 'lucide-react';

export const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Transactions', path: '/transactions', icon: <Receipt size={20} /> },
    { name: 'Insights', path: '/insights', icon: <Lightbulb size={20} /> },
  ];

  return (
    <aside className="w-64 border-r border-[var(--border-base)] bg-[var(--card)] hidden md:flex flex-col h-full shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-[var(--border-base)]">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-2xl tracking-tight">
          <Wallet className="w-7 h-7" />
          <span>VaultX</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium shadow-sm'
                  : 'text-[var(--text-muted)] hover:bg-[var(--background)] hover:text-[var(--text-main)]'
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-[var(--border-base)] text-xs text-[var(--text-muted)] text-center">
        Powered by VaultX Premium
      </div>
    </aside>
  );
};
