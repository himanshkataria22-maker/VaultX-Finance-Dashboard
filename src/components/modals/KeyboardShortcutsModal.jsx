import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard } from 'lucide-react';
import { SHORTCUTS } from '../../hooks/useKeyboardShortcuts';

export const KeyboardShortcutsModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-2xl bg-[var(--card)] rounded-2xl shadow-2xl border border-[var(--border-base)] overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-[var(--border-base)] bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl">
                  <Keyboard className="text-indigo-600 dark:text-indigo-400" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Keyboard Shortcuts</h2>
                  <p className="text-sm text-[var(--text-muted)]">Navigate faster with these shortcuts</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 text-[var(--text-muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-colors"
              >
                <X size={20} />
              </motion.button>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SHORTCUTS.map((shortcut, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 bg-[var(--background)] rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
                  >
                    <span className="text-sm text-[var(--text-muted)]">{shortcut.description}</span>
                    <kbd className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-[var(--border-base)] rounded-lg text-xs font-mono font-semibold shadow-sm">
                      {shortcut.key}
                    </kbd>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-[var(--border-base)] bg-[var(--background)]/50 text-center">
              <p className="text-xs text-[var(--text-muted)]">
                Press <kbd className="px-2 py-1 bg-white dark:bg-gray-800 border border-[var(--border-base)] rounded text-xs font-mono">?</kbd> anytime to see this help
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
