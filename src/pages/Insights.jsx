import { useMemo } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { generateInsights } from '../utils/insightsEngine';
import { Lightbulb, AlertTriangle, TrendingUp, TrendingDown, Info, ShieldAlert } from 'lucide-react';

export const Insights = () => {
  const { transactions } = useTransactions();
  
  const insights = useMemo(() => {
    return generateInsights(transactions);
  }, [transactions]);

  const getIcon = (type) => {
    switch(type) {
      case 'danger': return <AlertTriangle className="text-red-600 dark:text-red-400" size={24} />;
      case 'warning': return <ShieldAlert className="text-yellow-600 dark:text-yellow-400" size={24} />;
      case 'success': return <TrendingUp className="text-green-600 dark:text-green-400" size={24} />;
      default: return <Info className="text-blue-600 dark:text-blue-400" size={24} />;
    }
  };

  const getBgColor = (type) => {
    switch(type) {
      case 'danger': return 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20';
      case 'warning': return 'bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20';
      case 'success': return 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20';
      default: return 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20';
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col gap-2 mb-8 text-center md:text-left">
        <div className="inline-flex items-center gap-2 justify-center md:justify-start">
          <div className="p-2 bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400 rounded-xl">
             <Lightbulb size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Smart Insights</h1>
        </div>
        <p className="text-[var(--text-muted)]">AI-powered breakdown of your spending habits and financial health.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {insights.map((insight) => (
          <div 
            key={insight.id} 
            className={`flex items-start gap-4 p-5 rounded-2xl border transition-all hover:shadow-md ${getBgColor(insight.type)} animate-in slide-in-from-bottom flex-col sm:flex-row`}
          >
            <div className={`p-3 rounded-full shrink-0 flex items-center justify-center ${
                insight.type === 'danger' ? 'bg-red-100 dark:bg-red-900/40' :
                insight.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/40' :
                insight.type === 'success' ? 'bg-green-100 dark:bg-green-900/40' :
                'bg-blue-100 dark:bg-blue-900/40'
            }`}>
              {getIcon(insight.type)}
            </div>
            
            <div className="flex flex-col flex-1 pt-1">
              <h3 className="font-bold text-[var(--text-main)] mb-1 text-lg">{insight.title}</h3>
              <p className="text-[var(--text-muted)] leading-relaxed">{insight.text}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center text-sm text-[var(--text-muted)] p-6 bg-[var(--background)] rounded-2xl border border-[var(--border-base)]">
         <p>Insights are generated locally based on your transaction history.</p>
         <p className="mt-1">Add more data to receive more accurate financial recommendations.</p>
      </div>
    </div>
  );
};
