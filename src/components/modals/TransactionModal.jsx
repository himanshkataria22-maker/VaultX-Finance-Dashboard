import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTransactions } from '../../hooks/useTransactions';
import { categoriesList } from '../../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

export const TransactionModal = ({ isOpen, onClose, initialData }) => {
  const { addTransaction, updateTransaction } = useTransactions();
  const isEditing = !!initialData;

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    type: 'expense',
    notes: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        date: initialData.date.split('T')[0],
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.description || !formData.amount || !formData.date) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (parseFloat(formData.amount) <= 0) {
      alert('Amount must be greater than 0');
      return;
    }
    
    const dateObj = new Date(formData.date);
    dateObj.setHours(12, 0, 0);

    const payload = {
      ...formData,
      amount: parseFloat(formData.amount),
      id: isEditing ? initialData.id : `t_${Date.now()}`,
      date: dateObj.toISOString()
    };
    
    if (isEditing) {
      updateTransaction(payload);
    } else {
      addTransaction(payload);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 min-h-screen">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={onClose}
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg bg-[var(--card)] rounded-2xl shadow-2xl border border-[var(--border-base)]"
          >
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-base)]">
          <motion.h2 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-semibold text-[var(--text-main)]"
          >
            {isEditing ? 'Edit Transaction' : 'Add New Transaction'}
          </motion.h2>
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose} 
            className="p-2 text-[var(--text-muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-colors"
          >
            <X size={20} />
          </motion.button>
        </div>

        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit} 
          className="p-6 space-y-5"
        >
          <div className="flex gap-4 p-1 bg-[var(--background)] rounded-xl border border-[var(--border-base)]">
             <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: 'expense' }))}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${formData.type === 'expense' ? 'bg-white dark:bg-slate-700 shadow-sm text-red-600 dark:text-red-400' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
             >
                Expense
             </button>
             <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: 'income' }))}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${formData.type === 'income' ? 'bg-white dark:bg-slate-700 shadow-sm text-green-600 dark:text-green-400' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
             >
                Income
             </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-main)] mb-1.5">Description</label>
              <input 
                type="text" 
                required
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-[var(--background)] border border-[var(--border-base)] rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm"
                placeholder="e.g. Netflix Subscription"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-main)] mb-1.5">Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] font-medium">$</span>
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    value={formData.amount}
                    onChange={e => setFormData({...formData, amount: e.target.value})}
                    className="w-full bg-[var(--background)] border border-[var(--border-base)] rounded-xl pl-8 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text-main)] mb-1.5">Date</label>
                <input 
                  type="date" 
                  required
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-[var(--background)] border border-[var(--border-base)] rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-main)] mb-1.5">Category</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full bg-[var(--background)] border border-[var(--border-base)] rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm text-[var(--text-main)] appearance-none"
              >
                {categoriesList.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-main)] mb-1.5">Notes (Optional)</label>
              <textarea 
                value={formData.notes}
                onChange={e => setFormData({...formData, notes: e.target.value})}
                className="w-full bg-[var(--background)] border border-[var(--border-base)] rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm resize-none h-20"
                placeholder="Add any additional details..."
              ></textarea>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button" 
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold rounded-xl shadow-sm shadow-indigo-600/20 transition-all"
            >
              {isEditing ? 'Save Changes' : 'Confirm'}
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </div>
      )}
    </AnimatePresence>
  );
};
