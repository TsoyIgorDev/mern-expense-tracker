export interface User {
    _id?: string;
    id?: string;
    fullName: string;
    email: string;
    profileImageUrl?: string;
}

export interface IncomeItem {
    _id: string;
    type: string;
    amount: number;
    source: string;
    date: string;
    icon: string;
}

export interface ExpenseItem {
    _id: string;
    type: string;
    amount: number;
    category: string;
    date: string;
    icon: string;
}

export interface RecentTransactionItem {
    _id: string;
    type: string;
    amount: number;
    source: string;
    category: string;
    date: string;
    icon: string | undefined;
}

export interface DashboardData {
    totalBalance: number;
    totalIncome: number;
    totalExpense: number;
    recentTransactions: RecentTransactionItem[];
    last30DaysExpenses: {
        total: number;
        transactions: ExpenseItem[];
    };
    last60DaysIncomeTransactions: {
        total: number;
        transactions: IncomeItem[];
    };
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    fullName: string;
    email: string;
    password: string;
    profilePic: string | File | null;
}

export interface AddIncomePayload {
    amount: number;
    source: string;
    date: string;
    icon: string;
}

export interface AddExpensePayload {
    amount: number;
    category: string;
    date: string;
    icon: string;
}
