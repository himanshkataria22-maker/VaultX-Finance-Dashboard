import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, Lightbulb, Wallet, X } from 'lucide-react';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { KeyboardShortcutsModal } from '../modals/KeyboardShortcutsModal';
import { useAppContext } from '../../context/AppContext';

export const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);
  const { toggleTheme } = useAppContext();

  useKeyboardShortcuts({
    onShowHelp: () => setShowShortcutsModal(true),
    onEscape: () => {
      setMobileMenuOpen(false);
      setShowShortcutsModal(false);
    },
    onToggleTheme: toggleTheme,
  });

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Transactions', path: '/transactions', icon: <Receipt size={20} /> },
    { name: 'Insights', path: '/insights', icon: <Lightbulb size={20} /> },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--background)] text-[var(--text-main)] transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[var(--background)] p-4 md:p-6 lg:p-8 relative">
          <Outlet />
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative flex flex-col w-64 bg-[var(--card)] h-full shadow-2xl animate-in slide-in-from-left">
            <div className="h-16 flex items-center justify-between px-6 border-b border-[var(--border-base)]">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-2xl tracking-tight">
                <Wallet className="w-7 h-7" />
                <span>VaultX</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-[var(--text-muted)] hover:text-red-500">
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium'
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
          </div>
        </div>
      )}

      <KeyboardShortcutsModal isOpen={showShortcutsModal} onClose={() => setShowShortcutsModal(false)} />
    </div>
  );
};
