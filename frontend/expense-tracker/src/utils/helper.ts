import moment from "moment";

export const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (name: string): string => {
    if (!name) return "";
    const words = name.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i += 1) {
        initials += words[i][0];
    }

    return initials.toUpperCase();
};

export const addThousandsSeparator = (num: string | number | null | undefined): string => {
    if (num == null || Number.isNaN(Number(num))) return "";

    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
};

interface ExpenseChartItem {
    category?: string;
    amount?: number;
}

interface IncomeChartItem {
    date: string;
    amount?: number;
    source?: string;
}

export const prepareExpenseBarChartData = (data: ExpenseChartItem[] = []) => {
    return data.map((item) => ({
        category: item?.category || "",
        amount: item?.amount || 0,
    }));
};

export const prepareIncomeBarChartData = (data: IncomeChartItem[] = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return sortedData.map((item) => ({
        month: moment(item?.date).format("Do MMM"),
        amount: item?.amount || 0,
        source: item?.source || "",
    }));
};
