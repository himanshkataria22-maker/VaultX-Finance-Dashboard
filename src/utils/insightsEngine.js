import { isSameMonth, subMonths, parseISO } from 'date-fns';

export const generateInsights = (transactions) => {
  const now = new Date();
  
  const currentMonthTransactions = transactions.filter(t => isSameMonth(parseISO(t.date), now));
  const lastMonthTransactions = transactions.filter(t => isSameMonth(parseISO(t.date), subMonths(now, 1)));

  // Calculate generic stats
  const totalExpenseCurrent = currentMonthTransactions.reduce((acc, t) => t.type === 'expense' ? acc + t.amount : acc, 0);
  const totalExpenseLast = lastMonthTransactions.reduce((acc, t) => t.type === 'expense' ? acc + t.amount : acc, 0);
  
  const totalIncomeCurrent = currentMonthTransactions.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc, 0);
  const totalIncomeLast = lastMonthTransactions.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc, 0);

  const savingsCurrent = totalIncomeCurrent - totalExpenseCurrent;
  const savingsLast = totalIncomeLast - totalExpenseLast;

  const insights = [];

  // Insight 1: Highest spending category this month
  const categoryTotals = {};
  currentMonthTransactions.filter(t => t.type === 'expense').forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  let highestCategory = null;
  let highestAmount = 0;
  for (const [category, amount] of Object.entries(categoryTotals)) {
    if (amount > highestAmount) {
      highestAmount = amount;
      highestCategory = category;
    }
  }

  if (highestCategory) {
    insights.push({
      id: 'insight-1',
      type: 'warning',
      title: 'Highest Spending Category',
      text: `You spent the most on ${highestCategory} this month ($${highestAmount.toFixed(2)}).`
    });
  }

  // Insight 2: Monthly comparison
  if (totalExpenseLast > 0) {
    const diff = ((totalExpenseCurrent - totalExpenseLast) / totalExpenseLast) * 100;
    if (diff > 0) {
      insights.push({
        id: 'insight-2',
        type: 'danger',
        title: 'Spending Increased',
        text: `You spent ${Math.abs(diff).toFixed(0)}% more this month compared to last month.`
      });
    } else {
      insights.push({
        id: 'insight-2',
        type: 'success',
        title: 'Spending Decreased',
        text: `Great job! You spent ${Math.abs(diff).toFixed(0)}% less this month compared to last month.`
      });
    }
  }

  // Insight 3: Income trend
  if (totalIncomeLast > 0) {
     const incomeDiff = ((totalIncomeCurrent - totalIncomeLast) / totalIncomeLast) * 100;
     if (incomeDiff > 0) {
         insights.push({
             id: 'insight-3',
             type: 'success',
             title: 'Income Increased',
             text: `Income increased by ${Math.abs(incomeDiff).toFixed(0)}% compared to last month.`
         });
     }
  }

  // Insight 4: Savings trend
  if (savingsLast !== 0) {
    if (savingsCurrent < savingsLast) {
      insights.push({
        id: 'insight-4',
        type: 'warning',
        title: 'Savings Dropped',
        text: `Your savings dropped compared to last month.`
      });
    } else if (savingsCurrent > savingsLast) {
      insights.push({
        id: 'insight-4',
        type: 'success',
        title: 'Savings Increased',
        text: `Your savings have increased compared to last month!`
      });
    }
  }

  if (insights.length === 0) {
      insights.push({
          id: 'insight-0',
          type: 'neutral',
          title: 'Not enough data',
          text: 'Add more transactions to generate meaningful insights.'
      });
  }

  return insights;
};
