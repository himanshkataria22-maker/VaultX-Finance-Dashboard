import { TrendingUp, TrendingDown } from 'lucide-react';

export const SummaryCard = ({ 
  title, 
  value, 
  percentChange, 
  icon, 
  isCurrency = true, 
  iconBgClass = "bg-indigo-100 dark:bg-indigo-500/20", 
  iconColorClass = "text-indigo-600 dark:text-indigo-400" 
}) => {
  const formattedValue = isCurrency 
    ? `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` 
    : value.toString();

  return (
    <div className="card-premium p-6 group cursor-default">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl transition-transform duration-300 group-hover:scale-110 ${iconBgClass}`}>
          <div className={iconColorClass}>{icon}</div>
        </div>
        
        {percentChange !== undefined && percentChange !== 0 && (
          <div className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm ${percentChange > 0 ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'}`}>
            {percentChange > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {Math.abs(percentChange).toFixed(1)}%
          </div>
        )}
      </div>
      <div>
        <h3 className="text-[var(--text-muted)] text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold tracking-tight text-[var(--text-main)] transition-colors">
          {formattedValue}
        </p>
      </div>
    </div>
  );
};
