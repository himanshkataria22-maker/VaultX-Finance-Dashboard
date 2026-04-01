import { format, parseISO } from 'date-fns';

// Export to CSV
export const exportToCSV = (transactions) => {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount', 'Notes'];
  const csvData = transactions.map(tx => [
    format(parseISO(tx.date), 'yyyy-MM-dd'),
    tx.description,
    tx.category,
    tx.type,
    tx.amount.toFixed(2),
    tx.notes || ''
  ]);

  const csvContent = [
    headers.join(','),
    ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `vaultx-transactions-${format(new Date(), 'yyyy-MM-dd')}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Export to PDF (using HTML to PDF approach)
export const exportToPDF = (transactions, summary) => {
  const { totalIncome, totalExpense, totalBalance } = summary;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>VaultX Financial Report</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #6366f1; padding-bottom: 20px; }
        .header h1 { color: #6366f1; margin: 0; font-size: 32px; }
        .header p { color: #666; margin: 5px 0; }
        .summary { display: flex; justify-content: space-around; margin: 30px 0; }
        .summary-card { text-align: center; padding: 20px; background: #f8fafc; border-radius: 10px; }
        .summary-card h3 { margin: 0; color: #666; font-size: 14px; }
        .summary-card p { margin: 10px 0 0; font-size: 24px; font-weight: bold; }
        .income { color: #22c55e; }
        .expense { color: #ef4444; }
        .balance { color: #6366f1; }
        table { width: 100%; border-collapse: collapse; margin-top: 30px; }
        th { background: #6366f1; color: white; padding: 12px; text-align: left; }
        td { padding: 10px; border-bottom: 1px solid #e2e8f0; }
        tr:hover { background: #f8fafc; }
        .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>💰 VaultX Financial Report</h1>
        <p>Generated on ${format(new Date(), 'MMMM dd, yyyy')}</p>
      </div>
      
      <div class="summary">
        <div class="summary-card">
          <h3>Total Income</h3>
          <p class="income">$${totalIncome.toFixed(2)}</p>
        </div>
        <div class="summary-card">
          <h3>Total Expenses</h3>
          <p class="expense">$${totalExpense.toFixed(2)}</p>
        </div>
        <div class="summary-card">
          <h3>Balance</h3>
          <p class="balance">$${totalBalance.toFixed(2)}</p>
        </div>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          ${transactions.map(tx => `
            <tr>
              <td>${format(parseISO(tx.date), 'MMM dd, yyyy')}</td>
              <td>${tx.description}</td>
              <td>${tx.category}</td>
              <td style="text-transform: capitalize;">${tx.type}</td>
              <td style="color: ${tx.type === 'income' ? '#22c55e' : '#ef4444'}; font-weight: bold;">
                ${tx.type === 'income' ? '+' : '-'}$${tx.amount.toFixed(2)}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div class="footer">
        <p>Powered by VaultX Premium | Your Financial Companion</p>
      </div>
    </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  printWindow.document.write(htmlContent);
  printWindow.document.close();
  
  setTimeout(() => {
    printWindow.print();
  }, 250);
};

// Export summary as JSON
export const exportToJSON = (data) => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `vaultx-data-${format(new Date(), 'yyyy-MM-dd')}.json`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
