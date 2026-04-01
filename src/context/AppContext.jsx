import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialTransactions } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('vaultx_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem('vaultx_role') || 'Admin';
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('vaultx_theme') || 'dark'; // prefer dark default for premium look
  });

  useEffect(() => {
    localStorage.setItem('vaultx_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('vaultx_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('vaultx_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const addTransaction = (transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  const updateTransaction = (updatedTx) => {
    setTransactions(prev => prev.map(t => t.id === updatedTx.id ? updatedTx : t));
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const toggleRole = () => {
    setRole(r => r === 'Admin' ? 'Viewer' : 'Admin');
  };

  const toggleTheme = () => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  };

  return (
    <AppContext.Provider 
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        role,
        toggleRole,
        theme,
        toggleTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
