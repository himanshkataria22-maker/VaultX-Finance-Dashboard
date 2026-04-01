import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, Lightbulb, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

export const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Transactions', path: '/transactions', icon: <Receipt size={20} /> },
    { name: 'Insights', path: '/insights', icon: <Lightbulb size={20} /> },
  ];

  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-64 border-r border-[var(--border-base)] bg-[var(--card)] hidden md:flex flex-col h-full shrink-0"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="h-16 flex items-center px-6 border-b border-[var(--border-base)]"
      >
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-2xl tracking-tight">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Wallet className="w-7 h-7" />
          </motion.div>
          <span>VaultX</span>
        </div>
      </motion.div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium shadow-sm'
                    : 'text-[var(--text-muted)] hover:bg-[var(--background)] hover:text-[var(--text-main)]'
                }`
              }
            >
              <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                {item.icon}
              </motion.div>
              {item.name}
            </NavLink>
          </motion.div>
        ))}
      </nav>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="p-4 border-t border-[var(--border-base)] text-xs text-[var(--text-muted)] text-center"
      >
        Powered by VaultX Premium
      </motion.div>
    </motion.aside>
  );
};
