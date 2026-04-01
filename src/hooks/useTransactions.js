import { useAppContext } from '../context/AppContext';
import { useMemo } from 'react';

export const useTransactions = () => {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useAppContext();

  const totalBalance = useMemo(() => {
    return transactions.reduce((acc, t) => {
      return t.type === 'income' ? acc + t.amount : acc - t.amount;
    }, 0);
  }, [transactions]);

  const totalIncome = useMemo(() => {
    return transactions.reduce((acc, t) => {
      return t.type === 'income' ? acc + t.amount : acc;
    }, 0);
  }, [transactions]);

  const totalExpense = useMemo(() => {
    return transactions.reduce((acc, t) => {
      return t.type === 'expense' ? acc + t.amount : acc;
    }, 0);
  }, [transactions]);

  return {
    transactions,
    totalBalance,
    totalIncome,
    totalExpense,
    addTransaction,
    updateTransaction,
    deleteTransaction
  };
};
