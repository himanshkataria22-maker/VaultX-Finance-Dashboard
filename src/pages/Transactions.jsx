import { useState, useMemo } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { useAppContext } from '../context/AppContext';
import { Plus, Search, Filter, Edit2, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { CATEGORY_COLORS, categoriesList } from '../data/mockData';
import { TransactionModal } from '../components/modals/TransactionModal';

export const Transactions = () => {
  const { transactions, deleteTransaction } = useTransactions();
  const { role } = useAppContext();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Prepare categories list unique + 'All'
  const filterCategories = ['All', ...categoriesList];

  const sortedTransactions = useMemo(() => {
    let sortableItems = [...transactions];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [transactions, sortConfig]);

  const filteredTransactions = sortedTransactions.filter(tx => {
    const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || tx.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortIcon = (columnName) => {
    if (sortConfig?.key === columnName) {
      return sortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
    }
    return null;
  };

  const handleEdit = (tx) => {
    if (role === 'Viewer') return;
    setEditingTransaction(tx);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
     if (role === 'Viewer') return;
     if (window.confirm("Are you sure you want to delete this transaction?")) {
        deleteTransaction(id);
     }
  };

  const openAddModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
          <p className="text-[var(--text-muted)]">Manage and review your financial events.</p>
        </div>
        {role === 'Admin' && (
          <button 
            onClick={openAddModal}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl transition-colors font-medium shadow-sm shadow-indigo-600/30"
          >
            <Plus size={18} />
            Quick Add
          </button>
        )}
      </div>

      <div className="card-premium overflow-hidden">
        {/* Filters */}
        <div className="p-4 md:p-6 border-b border-[var(--border-base)] flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between bg-[var(--background)]/30">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input 
              type="text"
              placeholder="Search description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[var(--card)] border border-[var(--border-base)] rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-shadow"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
            <Filter size={16} className="text-[var(--text-muted)] mr-2 shrink-0" />
             {filterCategories.map((cat) => (
               <button
                 key={cat}
                 onClick={() => setFilterCategory(cat)}
                 className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                   filterCategory === cat 
                   ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-500/20 dark:border-indigo-500/30 dark:text-indigo-400 font-semibold shadow-sm' 
                   : 'bg-[var(--card)] border-[var(--border-base)] text-sm text-[var(--text-muted)] hover:bg-[var(--background)]'
                 }`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {filteredTransactions.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--background)] text-[var(--text-muted)] text-sm border-b border-[var(--border-base)]">
                  <th className="px-6 py-4 font-medium min-w-[120px] cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => requestSort('date')}>
                    <div className="flex items-center gap-1">Date {sortIcon('date')}</div>
                  </th>
                  <th className="px-6 py-4 font-medium min-w-[200px]">Description</th>
                  <th className="px-6 py-4 font-medium cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => requestSort('category')}>
                     <div className="flex items-center gap-1">Category {sortIcon('category')}</div>
                  </th>
                  <th className="px-6 py-4 font-medium cursor-pointer hover:text-indigo-600 transition-colors text-right" onClick={() => requestSort('amount')}>
                     <div className="flex items-center gap-1 justify-end">Amount {sortIcon('amount')}</div>
                  </th>
                  {role === 'Admin' && <th className="px-6 py-4 font-medium text-right min-w-[100px]">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-base)]">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-[var(--background)]/50 transition-colors group">
                    <td className="px-6 py-4 text-sm text-[var(--text-muted)] whitespace-nowrap">
                      {format(parseISO(tx.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {tx.description}
                      {tx.notes && <div className="text-xs text-[var(--text-muted)] font-normal mt-0.5">{tx.notes}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        className="px-2.5 py-1 rounded-full text-xs font-medium border border-transparent"
                        style={{
                          backgroundColor: `${CATEGORY_COLORS[tx.category] || CATEGORY_COLORS['Others']}15`,
                          borderColor: `${CATEGORY_COLORS[tx.category] || CATEGORY_COLORS['Others']}30`,
                          color: CATEGORY_COLORS[tx.category] || CATEGORY_COLORS['Others']
                        }}
                      >
                        {tx.category}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-right font-semibold whitespace-nowrap ${tx.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-slate-800 dark:text-slate-200'}`}>
                      {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                    </td>
                    {role === 'Admin' && (
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEdit(tx)} className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/20 rounded-lg transition-colors" title="Edit">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleDelete(tx.id)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/20 rounded-lg transition-colors" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center animate-in zoom-in-95 duration-300">
               <div className="w-20 h-20 bg-[var(--background)] rounded-full flex items-center justify-center mb-4">
                  <Search size={32} className="text-[var(--text-muted)] opacity-50"/>
               </div>
               <h3 className="text-lg font-semibold mb-1">No transactions found</h3>
               <p className="text-[var(--text-muted)] text-sm mb-6 max-w-sm">We couldn't find any transactions matching your current filters or search term.</p>
               {role === 'Admin' && (
                  <button onClick={openAddModal} className="text-indigo-600 hover:text-indigo-500 font-medium">Clear filters or add one</button>
               )}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <TransactionModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          initialData={editingTransaction} 
        />
      )}
    </div>
  );
};
