import { useState } from "react";
import EmojiPickerPopup from "../EmojiPickerPopup";
import Input from "../Inputs/Input";

interface ExpenseData {
    amount: number;
    category: string;
    date: string;
    icon: string;
}

interface AddExpenseFormProps {
    onAddExpense: (expense: ExpenseData) => Promise<void>;
}

const AddExpenseForm = ({ onAddExpense }: AddExpenseFormProps) => {
    const [expense, setExpense] = useState<ExpenseData>({
        amount: 0,
        category: "",
        date: "",
        icon: "",
    });

    const handleChange = (key: string, value: string) => {
        setExpense({ ...expense, [key]: value });
    };

    return (
        <div>
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={expense.category}
                onChange={({ target }) => handleChange("category", target.value)}
                label="Expense Category"
                placeholder="Food, Transport, Rent, etc."
                type="text"
            />

            <Input
                value={expense.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder=""
                type="number"
            />

            <Input
                value={expense.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                type="date"
            />

            <div>
                <button
                    type="button"
                    onClick={() => onAddExpense(expense)}
                    className="card-btn"
                >
                    Add Expense
                </button>
            </div>
        </div>
    );
};

export default AddExpenseForm;
