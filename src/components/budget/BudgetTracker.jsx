import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, AlertCircle, CheckCircle, Edit2, Trash2, Plus } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { categoriesList } from '../../data/mockData';

export const BudgetTracker = ({ transactions }) => {
  const { budgets, addBudget, updateBudget, deleteBudget } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ category: 'Food', limit: '' });

  // Calculate spending per category
  const categorySpending = useMemo(() => {
    const spending = {};
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        spending[t.category] = (spending[t.category] || 0) + t.amount;
      });
    return spending;
  }, [transactions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.limit || formData.limit <= 0) return;

    const budget = {
      id: editingId || `budget_${Date.now()}`,
      category: formData.category,
      limit: parseFloat(formData.limit),
      period: 'monthly'
    };

    if (editingId) {
      updateBudget(budget);
      setEditingId(null);
    } else {
      addBudget(budget);
    }

    setFormData({ category: 'Food', limit: '' });
    setIsAdding(false);
  };

  const getProgress = (category, limit) => {
    const spent = categorySpending[category] || 0;
    const percentage = (spent / limit) * 100;
    return { spent, percentage: Math.min(percentage, 100), isOver: spent > limit };
  };

  const getStatusColor = (percentage, isOver) => {
    if (isOver) return 'bg-red-500';
    if (percentage > 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-500/20 rounded-xl">
            <Target className="text-purple-600 dark:text-purple-400" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Budget Tracker</h2>
            <p className="text-sm text-[var(--text-muted)]">Keep your spending in check</p>
          </div>
        </div>
        
        {!isAdding && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium"
          >
            <Plus size={18} />
            Add Budget
          </motion.button>
        )}
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          onSubmit={handleSubmit}
          className="card-premium p-4 space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border-base)] rounded-lg"
              >
                {categoriesList.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Monthly Limit ($)</label>
              <input
                type="number"
                step="0.01"
                value={formData.limit}
                onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border-base)] rounded-lg"
                placeholder="500.00"
                required
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                setFormData({ category: 'Food', limit: '' });
              }}
              className="px-4 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-main)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
            >
              {editingId ? 'Update' : 'Add'} Budget
            </button>
          </div>
        </motion.form>
      )}

      {/* Budget List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {budgets && budgets.length > 0 ? (
          budgets.map((budget, index) => {
            const { spent, percentage, isOver } = getProgress(budget.category, budget.limit);
            
            return (
              <motion.div
                key={budget.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card-premium p-5 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{budget.category}</h3>
                    <p className="text-sm text-[var(--text-muted)]">
                      ${spent.toFixed(2)} of ${budget.limit.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(budget.id);
                        setFormData({ category: budget.category, limit: budget.limit });
                        setIsAdding(false);
                      }}
                      className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/20 rounded-lg"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => deleteBudget(budget.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/20 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{percentage.toFixed(0)}%</span>
                    <span className={`flex items-center gap-1 ${isOver ? 'text-red-500' : percentage > 80 ? 'text-yellow-500' : 'text-green-500'}`}>
                      {isOver ? (
                        <>
                          <AlertCircle size={14} />
                          Over Budget
                        </>
                      ) : percentage > 80 ? (
                        <>
                          <TrendingUp size={14} />
                          Warning
                        </>
                      ) : (
                        <>
                          <CheckCircle size={14} />
                          On Track
                        </>
                      )}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full ${getStatusColor(percentage, isOver)} transition-colors`}
                    />
                  </div>
                </div>

                {isOver && (
                  <p className="text-xs text-red-500 font-medium">
                    You've exceeded your budget by ${(spent - budget.limit).toFixed(2)}
                  </p>
                )}
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-2 text-center py-12 text-[var(--text-muted)]">
            <Target size={48} className="mx-auto mb-4 opacity-50" />
            <p>No budgets yet. Create one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};
