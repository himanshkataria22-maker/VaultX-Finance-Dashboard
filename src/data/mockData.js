export const initialTransactions = [
  {
    id: 't1',
    date: '2026-03-25T10:00:00.000Z',
    description: 'TechCorp Salary',
    category: 'Salary',
    amount: 5200,
    type: 'income',
    notes: 'March Salary'
  },
  {
    id: 't2',
    date: '2026-03-28T14:30:00.000Z',
    description: 'Whole Foods Market',
    category: 'Food',
    amount: 150.5,
    type: 'expense',
    notes: 'Groceries'
  },
  {
    id: 't3',
    date: '2026-03-29T18:45:00.000Z',
    description: 'Uber Ride',
    category: 'Travel',
    amount: 25.0,
    type: 'expense',
    notes: 'To downtown'
  },
  {
    id: 't4',
    date: '2026-03-31T09:10:00.000Z',
    description: 'Electricity Bill',
    category: 'Bills',
    amount: 120.0,
    type: 'expense',
    notes: 'Monthly utility'
  },
  {
    id: 't5',
    date: '2026-04-01T12:00:00.000Z',
    description: 'Apple Store',
    category: 'Shopping',
    amount: 1200.0,
    type: 'expense',
    notes: 'New laptop'
  },
  {
    id: 't6',
    date: '2026-04-01T15:20:00.000Z',
    description: 'Freelance UI Design',
    category: 'Freelance',
    amount: 850.0,
    type: 'income',
    notes: 'Landing page project'
  },
  {
    id: 't7',
    date: '2026-04-02T19:00:00.000Z',
    description: 'Dinner at Mario\'s',
    category: 'Food',
    amount: 85.0,
    type: 'expense',
    notes: 'Date night'
  }
];

export const CATEGORY_COLORS = {
  'Food': '#f43f5e',      // Rose
  'Travel': '#10b981',    // Emerald
  'Bills': '#3b82f6',     // Blue
  'Shopping': '#8b5cf6',  // Violet
  'Others': '#64748b',    // Slate
  'Salary': '#22c55e',    // Green
  'Freelance': '#0ea5e9'  // Sky
};

export const categoriesList = Object.keys(CATEGORY_COLORS);
