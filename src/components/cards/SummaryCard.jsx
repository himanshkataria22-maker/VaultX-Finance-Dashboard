import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export const SummaryCard = ({ 
  title, 
  value, 
  percentChange, 
  icon, 
  isCurrency = true, 
  iconBgClass = "bg-indigo-100 dark:bg-indigo-500/20", 
  iconColorClass = "text-indigo-600 dark:text-indigo-400" 
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  const formattedValue = isCurrency 
    ? `$${displayValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` 
    : Math.round(displayValue).toString();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="card-premium p-6 group cursor-default relative overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <motion.div 
            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className={`p-3 rounded-xl ${iconBgClass}`}
          >
            <div className={iconColorClass}>{icon}</div>
          </motion.div>
          
          {percentChange !== undefined && percentChange !== 0 && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm ${percentChange > 0 ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'}`}
            >
              <motion.div
                animate={{ y: percentChange > 0 ? [-2, 0] : [2, 0] }}
                transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
              >
                {percentChange > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              </motion.div>
              {Math.abs(percentChange).toFixed(1)}%
            </motion.div>
          )}
        </div>
        <div>
          <h3 className="text-[var(--text-muted)] text-sm font-medium mb-1">{title}</h3>
          <motion.p 
            className="text-3xl font-bold tracking-tight text-[var(--text-main)] transition-colors"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            {formattedValue}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};
