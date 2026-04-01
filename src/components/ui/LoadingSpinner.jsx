import { motion } from 'framer-motion';

export const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <motion.div
        className={`${sizeClasses[size]} border-4 border-indigo-200 dark:border-indigo-900 border-t-indigo-600 dark:border-t-indigo-400 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-[var(--text-muted)]"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div className="card-premium p-6 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>
      <div className="space-y-2">
        <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="w-32 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
};

export const SkeletonTable = ({ rows = 5 }) => {
  return (
    <div className="space-y-3 p-6">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex gap-4 animate-pulse">
          <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      ))}
    </div>
  );
};
