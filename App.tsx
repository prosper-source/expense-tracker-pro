import React, { useState, useEffect } from 'react';
import { 
  Plus, TrendingUp, TrendingDown, Wallet, Calendar, Search, 
  Trash2, Download, Moon, Sun, LogOut, Target, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import jsPDF from 'jspdf';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface User {
  name: string;
  email: string;
}

const CATEGORIES = ['Food', 'Transport', 'Rent', 'Entertainment', 'Savings', 'Other'];

const ExpenseTrackerPro: React.FC = () => {
  // Theme
  const [isDark, setIsDark] = useState(true);
  
  // Auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  // Data
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgetLimit, setBudgetLimit] = useState(150000); // Default ₦150,000

  // UI State
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');

  // New Transaction Form
  const [newTx, setNewTx] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    category: 'Food',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  // Load from localStorage
  useEffect(() => {
    const savedTransactions = localStorage.getItem('expenseTrackerTransactions');
    const savedBudget = localStorage.getItem('expenseTrackerBudget');
    const savedTheme = localStorage.getItem('expenseTrackerTheme');
    const savedUser = localStorage.getItem('expenseTrackerUser');

    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    if (savedBudget) setBudgetLimit(parseInt(savedBudget));
    if (savedTheme) setIsDark(savedTheme === 'dark');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('expenseTrackerTransactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('expenseTrackerBudget', budgetLimit.toString());
  }, [budgetLimit]);

  useEffect(() => {
    localStorage.setItem('expenseTrackerTheme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Calculations
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const isOverBudget = totalExpenses > budgetLimit;

  // Filtered Transactions
  const filteredTransactions = transactions
    .filter(tx => {
      const matchesSearch = 
        tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'All' || tx.category === filterCategory;
      const matchesType = filterType === 'all' || tx.type === filterType;
      const txTime = new Date(tx.date).getTime();
      const matchesStartDate = !filterStartDate || txTime >= new Date(filterStartDate).getTime();
      const matchesEndDate = !filterEndDate || txTime <= new Date(filterEndDate).getTime() + 86_399_999;
      return matchesSearch && matchesCategory && matchesType && matchesStartDate && matchesEndDate;
    })
    .sort((a, b) => {
      if (sortBy === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === 'highest') return b.amount - a.amount;
      if (sortBy === 'lowest') return a.amount - b.amount;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  // Monthly Summary (Current Month)
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyTransactions = transactions.filter(tx => {
    const txDate = new Date(tx.date);
    return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear;
  });

  const monthlyIncome = monthlyTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const monthlyExpense = monthlyTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  // Chart Data
  const chartData = [
    { name: 'Income', amount: totalIncome, fill: '#10b981' },
    { name: 'Expenses', amount: totalExpenses, fill: '#f43f5e' },
  ];

  const categoryData = CATEGORIES.map(cat => {
    const catExpenses = transactions
      .filter(t => t.type === 'expense' && t.category === cat)
      .reduce((sum, t) => sum + t.amount, 0);
    return { name: cat, value: catExpenses };
  }).filter(d => d.value > 0);

  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#64748b'];

  // Handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email) {
      const newUser = { name: loginForm.email.split('@')[0], email: loginForm.email };
      setUser(newUser);
      setIsLoggedIn(true);
      localStorage.setItem('expenseTrackerUser', JSON.stringify(newUser));
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('expenseTrackerUser');
  };

  const addTransaction = () => {
    if (!newTx.amount || !newTx.description) return;

    const transaction: Transaction = {
      id: Date.now().toString(),
      type: newTx.type,
      amount: parseFloat(newTx.amount),
      category: newTx.category,
      description: newTx.description,
      date: newTx.date,
    };

    setTransactions([transaction, ...transactions]);
    setNewTx({
      type: 'expense',
      amount: '',
      category: 'Food',
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
    setShowAddModal(false);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterCategory('All');
    setFilterType('all');
    setFilterStartDate('');
    setFilterEndDate('');
    setSortBy('newest');
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Type', 'Category', 'Description', 'Amount (NGN)'];
    const rows = filteredTransactions.map(tx => [
      tx.date,
      tx.type,
      tx.category,
      tx.description,
      tx.amount.toString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `expense-tracker-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Expense Tracker Pro - Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 28);
    doc.text(`User: ${user?.name || 'Guest'}`, 20, 34);

    doc.setFontSize(14);
    doc.text('Summary', 20, 48);
    doc.text(`Total Balance: ₦${balance.toLocaleString()}`, 20, 58);
    doc.text(`Total Income: ₦${totalIncome.toLocaleString()}`, 20, 66);
    doc.text(`Total Expenses: ₦${totalExpenses.toLocaleString()}`, 20, 74);

    doc.text('Transactions', 20, 90);
    let y = 100;
    filteredTransactions.slice(0, 20).forEach((tx) => {
      if (y > 260) {
        doc.addPage();
        y = 30;
      }
      doc.text(`${tx.date} | ${tx.type} | ${tx.category} | ${tx.description} | ₦${tx.amount}`, 20, y);
      y += 8;
    });

    doc.save(`expense-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Fake Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-2xl mb-6">
              <Wallet className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">Expense Tracker Pro</h1>
            <p className="text-zinc-400 mt-2">Professional personal finance management</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <form onSubmit={handleLogin}>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-zinc-400">Email Address</label>
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    className="w-full mt-2 bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:border-emerald-600"
                    placeholder="you@company.com"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-zinc-400">Password</label>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full mt-2 bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:border-emerald-600"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-semibold transition-all active:scale-[0.985]"
                >
                  Sign In to Dashboard
                </button>
              </div>
            </form>
            <div className="mt-6 text-center text-sm text-zinc-500">
              Demo: Use any email to login
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-950'}`}>
      {/* Navbar */}
      <nav className="border-b border-zinc-800 dark:border-zinc-800 bg-zinc-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-emerald-600 rounded-2xl flex items-center justify-center">
                <Wallet className="text-white" size={20} />
              </div>
              <div>
                <div className="font-bold text-xl tracking-tight">Expense Tracker Pro</div>
                <div className="text-[10px] text-zinc-500 -mt-1">PERSONAL FINANCE</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Secure • Encrypted
            </div>

            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-3 rounded-2xl hover:bg-zinc-900 border border-zinc-800 transition-colors"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-zinc-800">
              <div className="text-right">
                <div className="font-semibold text-sm">{user?.name}</div>
                <div className="text-xs text-zinc-500">{user?.email}</div>
              </div>
              <button onClick={handleLogout} className="p-2.5 hover:bg-zinc-900 rounded-2xl border border-zinc-800">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter">Dashboard</h1>
            <p className="text-zinc-400 mt-1">Welcome back, {user?.name}. Here's your financial overview.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowBudgetModal(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-zinc-800 hover:bg-zinc-900 transition-all text-sm font-medium"
            >
              <Target size={18} /> Set Budget
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-2xl font-semibold text-sm transition-all active:scale-[0.985]"
            >
              <Plus size={18} /> Add Transaction
            </button>
          </div>
        </div>

        {isOverBudget && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 rounded-3xl border border-rose-500/30 bg-rose-500/10 p-5 text-rose-200 flex flex-col md:flex-row md:items-center justify-between gap-3"
          >
            <div>
              <div className="font-semibold text-white">Budget warning</div>
              <div className="text-sm text-rose-200/80">You have exceeded your monthly budget by ₦{(totalExpenses - budgetLimit).toLocaleString()}.</div>
            </div>
            <button onClick={() => setShowBudgetModal(true)} className="px-4 py-2 rounded-2xl bg-rose-500 text-white text-sm font-semibold">
              Adjust budget
            </button>
          </motion.div>
        )}

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Total Balance */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-zinc-400 mb-1">TOTAL BALANCE</div>
                <div className="text-5xl font-bold tracking-tighter tabular-nums">₦{balance.toLocaleString()}</div>
              </div>
              <div className="p-4 bg-zinc-800 rounded-2xl"><Wallet size={26} /></div>
            </div>
            <div className="mt-8 text-sm text-emerald-500 flex items-center gap-2">
              <TrendingUp size={16} /> {balance >= 0 ? 'Healthy finances' : 'Review spending'}
            </div>
          </div>

          {/* Income */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-zinc-400 mb-1">TOTAL INCOME</div>
                <div className="text-5xl font-bold tracking-tighter text-emerald-500 tabular-nums">₦{totalIncome.toLocaleString()}</div>
              </div>
              <div className="p-4 bg-emerald-950 text-emerald-500 rounded-2xl"><TrendingUp size={26} /></div>
            </div>
            <div className="mt-8 text-xs text-zinc-400">All time • {transactions.filter(t => t.type === 'income').length} entries</div>
          </div>

          {/* Expenses */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-zinc-400 mb-1">TOTAL EXPENSES</div>
                <div className="text-5xl font-bold tracking-tighter text-rose-500 tabular-nums">₦{totalExpenses.toLocaleString()}</div>
              </div>
              <div className="p-4 bg-rose-950 text-rose-500 rounded-2xl"><TrendingDown size={26} /></div>
            </div>
            <div className="mt-8 text-xs flex items-center gap-2">
              {isOverBudget ? (
                <span className="text-rose-500 font-medium">⚠️ Over budget by ₦{(totalExpenses - budgetLimit).toLocaleString()}</span>
              ) : (
                <span className="text-emerald-500">₦{(budgetLimit - totalExpenses).toLocaleString()} remaining</span>
              )}
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-10">
          <div className="lg:col-span-3 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="font-semibold text-lg">Income vs Expenses</div>
                <div className="text-xs text-zinc-400">Overall financial overview</div>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="name" stroke="#52525b" />
                  <YAxis stroke="#52525b" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '12px' }} 
                    formatter={(value) => [`₦${Number(value).toLocaleString()}`, 'Amount']}
                  />
                  <Bar dataKey="amount" radius={8}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <div className="font-semibold text-lg mb-6">Spending by Category</div>
            <div className="h-72 flex items-center justify-center">
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                      {categoryData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center text-zinc-400">No expenses yet</div>
              )}
            </div>
          </div>
        </div>

        {/* Monthly Summary + Budget */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="font-semibold">Monthly Summary — {new Date().toLocaleString('default', { month: 'long' })}</div>
              <Calendar className="text-zinc-500" size={18} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-950 p-6 rounded-2xl">
                <div className="text-xs text-emerald-400">INCOME THIS MONTH</div>
                <div className="text-3xl font-bold mt-2">₦{monthlyIncome.toLocaleString()}</div>
              </div>
              <div className="bg-zinc-950 p-6 rounded-2xl">
                <div className="text-xs text-rose-400">EXPENSES THIS MONTH</div>
                <div className="text-3xl font-bold mt-2">₦{monthlyExpense.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col">
            <div className="font-semibold mb-1">Budget Limit</div>
            <div className="text-4xl font-bold tracking-tight">₦{budgetLimit.toLocaleString()}</div>
            <div className="mt-auto pt-6 text-xs text-zinc-400">Monthly spending cap</div>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
          <div className="p-8 border-b border-zinc-800 flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <div className="font-semibold text-xl">Transactions</div>
            
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              {/* Search */}
              <div className="relative flex-1 md:w-72">
                <Search className="absolute left-4 top-4 text-zinc-500" size={18} />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 pl-11 py-3 rounded-2xl text-sm focus:outline-none focus:border-zinc-700"
                />
              </div>

              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 px-4 py-3 rounded-2xl text-sm focus:outline-none"
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>

              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="bg-zinc-950 border border-zinc-800 px-4 py-3 rounded-2xl text-sm focus:outline-none"
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              <input
                type="date"
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 px-4 py-3 rounded-2xl text-sm focus:outline-none"
                aria-label="Filter start date"
              />

              <input
                type="date"
                value={filterEndDate}
                onChange={(e) => setFilterEndDate(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 px-4 py-3 rounded-2xl text-sm focus:outline-none"
                aria-label="Filter end date"
              />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-zinc-950 border border-zinc-800 px-4 py-3 rounded-2xl text-sm focus:outline-none"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Highest</option>
                <option value="lowest">Lowest</option>
              </select>

              {(searchTerm || filterCategory !== 'All' || filterType !== 'all' || filterStartDate || filterEndDate || sortBy !== 'newest') && (
                <button onClick={clearFilters} className="flex items-center gap-2 px-5 py-3 border border-zinc-800 hover:bg-zinc-950 rounded-2xl text-sm font-medium">
                  <X size={16} /> Clear
                </button>
              )}

              <button onClick={exportToCSV} className="flex items-center gap-2 px-5 py-3 border border-zinc-800 hover:bg-zinc-950 rounded-2xl text-sm font-medium">
                <Download size={16} /> CSV
              </button>
              <button onClick={exportToPDF} className="flex items-center gap-2 px-5 py-3 border border-zinc-800 hover:bg-zinc-950 rounded-2xl text-sm font-medium">
                <Download size={16} /> PDF
              </button>
            </div>
          </div>

          {/* Transactions List */}
          <div className="divide-y divide-zinc-800 max-h-[480px] overflow-auto">
            {filteredTransactions.length > 0 ? (
              <AnimatePresence initial={false}>
                {filteredTransactions.map((tx) => (
                  <motion.div
                    key={tx.id}
                    layout
                    initial={{ opacity: 0, y: 14, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -24, scale: 0.96 }}
                    transition={{ duration: 0.22 }}
                    className="flex items-center justify-between px-8 py-5 hover:bg-zinc-950 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${tx.type === 'income' ? 'bg-emerald-950 text-emerald-500' : 'bg-rose-950 text-rose-500'}`}>
                        {tx.type === 'income' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                      </div>
                      <div>
                        <div className="font-semibold">{tx.description}</div>
                        <div className="text-xs text-zinc-400">{tx.category} • {new Date(tx.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className={`font-semibold tabular-nums text-lg ${tx.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {tx.type === 'income' ? '+' : '-'}₦{tx.amount.toLocaleString()}
                      </div>
                      <button 
                        onClick={() => deleteTransaction(tx.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-zinc-500 hover:text-rose-400 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <div className="px-8 py-16 text-center text-zinc-400">No transactions found.</div>
            )}
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6" onClick={() => setShowAddModal(false)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-3xl p-8"
            >
              <h3 className="font-semibold text-2xl mb-6">New Transaction</h3>
              
              <div className="flex gap-2 mb-6">
                {(['expense', 'income'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setNewTx({ ...newTx, type: t })}
                    className={`flex-1 py-3 rounded-2xl text-sm font-semibold border transition-all ${newTx.type === t ? 'bg-white text-zinc-950 border-white' : 'border-zinc-700 text-zinc-400'}`}
                  >
                    {t === 'income' ? 'Income' : 'Expense'}
                  </button>
                ))}
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-sm text-zinc-400">Amount (₦)</label>
                  <input type="number" value={newTx.amount} onChange={e => setNewTx({ ...newTx, amount: e.target.value })} className="mt-1.5 w-full bg-zinc-950 border border-zinc-800 px-4 py-4 rounded-2xl" placeholder="0" />
                </div>

                <div>
                  <label className="text-sm text-zinc-400">Category</label>
                  <select value={newTx.category} onChange={e => setNewTx({ ...newTx, category: e.target.value })} className="mt-1.5 w-full bg-zinc-950 border border-zinc-800 px-4 py-4 rounded-2xl">
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-zinc-400">Description</label>
                  <input type="text" value={newTx.description} onChange={e => setNewTx({ ...newTx, description: e.target.value })} className="mt-1.5 w-full bg-zinc-950 border border-zinc-800 px-4 py-4 rounded-2xl" placeholder="What was this for?" />
                </div>

                <div>
                  <label className="text-sm text-zinc-400">Date</label>
                  <input type="date" value={newTx.date} onChange={e => setNewTx({ ...newTx, date: e.target.value })} className="mt-1.5 w-full bg-zinc-950 border border-zinc-800 px-4 py-4 rounded-2xl" />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-4 border border-zinc-700 rounded-2xl font-medium">Cancel</button>
                <button onClick={addTransaction} className="flex-1 py-4 bg-emerald-600 rounded-2xl font-medium">Add Transaction</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Budget Modal */}
      <AnimatePresence>
        {showBudgetModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6" onClick={() => setShowBudgetModal(false)}>
            <div onClick={e => e.stopPropagation()} className="bg-zinc-900 border border-zinc-800 w-full max-w-sm rounded-3xl p-8">
              <h3 className="font-semibold text-xl mb-4">Set Monthly Budget</h3>
              <input 
                type="number" 
                value={budgetLimit} 
                onChange={(e) => setBudgetLimit(Number(e.target.value))} 
                className="w-full bg-zinc-950 border border-zinc-800 px-4 py-4 text-3xl font-bold rounded-2xl mb-8" 
              />
              <button onClick={() => setShowBudgetModal(false)} className="w-full py-4 bg-white text-zinc-950 rounded-2xl font-semibold">Save Budget</button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpenseTrackerPro;
