// Currency formatting utility
export const formatCurrency = (amount, showSign = false) => {
  const formatted = `$${Math.abs(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  
  if (showSign && amount !== 0) {
    return amount > 0 ? `+${formatted}` : `-${formatted}`;
  }
  
  return formatted;
};

// Date formatting utility
export const formatDate = (dateString, format = 'short') => {
  const date = new Date(dateString);
  
  if (format === 'short') {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  
  if (format === 'long') {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }
  
  return date.toLocaleDateString();
};

// Number formatting utility
export const formatNumber = (num, decimals = 0) => {
  return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
