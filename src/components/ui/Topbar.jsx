import { Moon, Sun, User, ShieldAlert, Menu } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';

export const Topbar = ({ onMenuClick }) => {
  const { role, toggleRole, theme, toggleTheme } = useAppContext();

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-16 px-4 md:px-6 border-b border-[var(--border-base)] bg-[var(--card)]/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-20 w-full transition-colors duration-300 shadow-sm"
    >
      <div className="flex items-center gap-2 md:hidden">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onMenuClick} 
          className="p-2 text-[var(--text-muted)] hover:text-[var(--text-main)]"
        >
          <Menu size={24} />
        </motion.button>
        <span className="font-bold text-xl text-indigo-600 dark:text-indigo-400">VaultX</span>
      </div>

      <div className="flex items-center gap-4 md:gap-6 ml-auto">
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme} 
          className="p-2 rounded-full hover:bg-[var(--background)] transition-colors text-[var(--text-muted)] hover:text-indigo-500"
          title="Toggle Dark Mode"
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === 'dark' ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </motion.div>
        </motion.button>

        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="flex items-center gap-3"
        >
          <div className="flex flex-col items-end" title="Switch role to simulate permissions">
            <span className="text-sm font-semibold">{role} Role</span>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleRole}
              className="text-xs text-indigo-500 hover:underline flex items-center gap-1"
            >
              Switch to {role === 'Admin' ? 'Viewer' : 'Admin'}
            </motion.button>
          </div>
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`p-2 rounded-full ring-2 ring-offset-2 ring-offset-[var(--card)] ${role === 'Admin' ? 'bg-indigo-100 text-indigo-700 ring-indigo-200 dark:bg-indigo-900 dark:text-indigo-300 dark:ring-indigo-700' : 'bg-green-100 text-green-700 ring-green-200 dark:bg-green-900 dark:text-green-300 dark:ring-green-700'}`}
          >
            {role === 'Admin' ? <ShieldAlert size={20}/> : <User size={20} />}
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  );
};
