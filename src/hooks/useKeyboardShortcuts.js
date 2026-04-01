import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useKeyboardShortcuts = (callbacks = {}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ignore if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        return;
      }

      // Ctrl/Cmd + K - Quick search/command palette
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        callbacks.onSearch?.();
      }

      // Ctrl/Cmd + N - New transaction
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        callbacks.onNewTransaction?.();
      }

      // Ctrl/Cmd + E - Export data
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        callbacks.onExport?.();
      }

      // Ctrl/Cmd + B - Toggle budget view
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        callbacks.onToggleBudget?.();
      }

      // Ctrl/Cmd + T - Toggle theme
      if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        callbacks.onToggleTheme?.();
      }

      // Navigation shortcuts (without modifiers)
      if (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
        switch(e.key) {
          case '1':
            navigate('/');
            break;
          case '2':
            navigate('/transactions');
            break;
          case '3':
            navigate('/insights');
            break;
          case '?':
            callbacks.onShowHelp?.();
            break;
          case 'Escape':
            callbacks.onEscape?.();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate, callbacks]);
};

export const SHORTCUTS = [
  { key: 'Ctrl/Cmd + K', description: 'Quick search' },
  { key: 'Ctrl/Cmd + N', description: 'New transaction' },
  { key: 'Ctrl/Cmd + E', description: 'Export data' },
  { key: 'Ctrl/Cmd + B', description: 'Toggle budget view' },
  { key: 'Ctrl/Cmd + T', description: 'Toggle theme' },
  { key: '1', description: 'Go to Dashboard' },
  { key: '2', description: 'Go to Transactions' },
  { key: '3', description: 'Go to Insights' },
  { key: '?', description: 'Show keyboard shortcuts' },
  { key: 'Esc', description: 'Close modal/menu' },
];
