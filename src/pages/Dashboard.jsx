import { SummaryCard } from '../components/cards/SummaryCard';
import { useTransactions } from '../hooks/useTransactions';
import { Wallet, TrendingUp, TrendingDown, PiggyBank, ArrowRight } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { CATEGORY_COLORS } from '../data/mockData';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const { transactions, totalBalance, totalIncome, totalExpense } = useTransactions();

  // Mock previous values to show realistic percentage changes
  const prevBalance = totalBalance * 0.85;
  const prevIncome = totalIncome * 0.82;
  const prevExpense = totalExpense * 1.05;
  const prevSavings = prevIncome - prevExpense;

  const getChange = (current, previous) => previous > 0 ? ((current - previous) / previous) * 100 : 0;

  const totalSavings = totalIncome - totalExpense;

  // Pie Chart Data (Expenses by Category)
  const expensesByCategory = {};
  transactions.filter(t => t.type === 'expense').forEach(t => {
    expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
  });

  const pieData = Object.keys(expensesByCategory).map(key => ({
    name: key,
    value: expensesByCategory[key]
  })).sort((a, b) => b.value - a.value);

  // Line Chart Data (Last 7 days balance mock)
  const lineData = [...transactions].reverse().map(t => ({
    date: format(parseISO(t.date), 'MMM dd'),
    amount: t.amount,
  })).slice(-10);

  const recentTransactions = [...transactions].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Summary</h1>
        <p className="text-[var(--text-muted)]">Here's what's happening with your finances today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <SummaryCard 
          title="Total Balance" 
          value={totalBalance} 
          percentChange={getChange(totalBalance, prevBalance)}
          icon={<Wallet size={24} />} 
          iconBgClass="bg-indigo-100 dark:bg-indigo-500/20"
          iconColorClass="text-indigo-600 dark:text-indigo-400"
        />
        <SummaryCard 
          title="Total Income" 
          value={totalIncome} 
          percentChange={getChange(totalIncome, prevIncome)}
          icon={<TrendingUp size={24} />} 
          iconBgClass="bg-green-100 dark:bg-green-500/20"
          iconColorClass="text-green-600 dark:text-green-400"
        />
        <SummaryCard 
          title="Total Expenses" 
          value={totalExpense} 
          percentChange={getChange(totalExpense, prevExpense)}
          icon={<TrendingDown size={24} />} 
          iconBgClass="bg-red-100 dark:bg-red-500/20"
          iconColorClass="text-red-600 dark:text-red-400"
        />
        <SummaryCard 
          title="Total Savings" 
          value={totalSavings} 
          percentChange={getChange(totalSavings, prevSavings)}
          icon={<PiggyBank size={24} />} 
          iconBgClass="bg-blue-100 dark:bg-blue-500/20"
          iconColorClass="text-blue-600 dark:text-blue-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="card-premium p-6 lg:col-span-2 flex flex-col">
          <h3 className="font-semibold text-lg mb-6">Recent Activity Trend</h3>
          <div className="h-72 w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-base)" />
                <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: 'var(--text-muted)' }} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border-base)', color: 'var(--text-main)', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: 'var(--text-main)' }}
                />
                <Line type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6, stroke: '#4f46e5', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="card-premium p-6 flex flex-col">
          <h3 className="font-semibold text-lg mb-6">Expenses by Category</h3>
          <div className="h-64 w-full flex-1 relative">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border-base)', color: 'var(--text-main)', borderRadius: '12px' }}
                  />
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="var(--card)"
                    strokeWidth={2}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name] || CATEGORY_COLORS['Others']} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            ) : (
               <div className="h-full flex items-center justify-center text-[var(--text-muted)]">No expenses this month</div>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
             {pieData.map((entry, index) => (
                <div key={index} className="flex items-center gap-1.5 text-sm">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[entry.name] || CATEGORY_COLORS['Others']}}></div>
                   <span className="text-[var(--text-muted)]">{entry.name}</span>
                </div>
             ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions Preview */}
      <div className="card-premium overflow-hidden">
        <div className="p-6 border-b border-[var(--border-base)] flex justify-between items-center">
          <h3 className="font-semibold text-lg">Recent Transactions</h3>
          <Link to="/transactions" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium flex items-center gap-1 group">
            View All
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          {recentTransactions.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--background)] text-[var(--text-muted)] text-sm border-b border-[var(--border-base)]">
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Description</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-base)]">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-[var(--background)]/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-[var(--text-muted)] whitespace-nowrap">
                      {format(parseISO(tx.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {tx.description}
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        className="px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `${CATEGORY_COLORS[tx.category] || CATEGORY_COLORS['Others']}20`,
                          color: CATEGORY_COLORS[tx.category] || CATEGORY_COLORS['Others']
                        }}
                      >
                        {tx.category}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-right font-semibold whitespace-nowrap ${tx.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-[var(--text-main)]'}`}>
                      {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-[var(--text-muted)]">No transactions available.</div>
          )}
        </div>
      </div>
    </div>
  );
};
