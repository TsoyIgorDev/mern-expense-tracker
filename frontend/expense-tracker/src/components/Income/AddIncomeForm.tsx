import { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

interface AddIncomeFormProps {
    onAddIncome: (income: IncomeData) => Promise<void>;
}

interface IncomeData {
    amount: number;
    source: string;
    date: string;
    icon: string;
}

const AddIncomeForm = ({ onAddIncome }: AddIncomeFormProps) => {
    const [income, setIncome] = useState<IncomeData>({
        amount: 0,
        source: "",
        date: "",
        icon: "",
    });

    const handleChange = (key: string, value: string) => { setIncome({ ...income, [key]: value }) }
    return (
        <div>
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={income.source}
                onChange={({ target }) => handleChange("source", target.value)}
                label="Income Source"
                placeholder="Salary, Freelancing, etc."
                type="text"
            />

            <Input
                value={income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder=""
                type="number"
            />

            <Input
                value={income.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                type="date"
            />

            <div className="">
                <button
                    type="button"
                    onClick={() => onAddIncome(income)}
                    className="card-btn">
                    Add Income
                </button>
            </div>
        </div>
    )
}

export default AddIncomeForm