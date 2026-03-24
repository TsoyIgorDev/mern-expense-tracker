import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import { useMemo } from "react";
import { prepareIncomeBarChartData } from "../../utils/helper";

interface IncomeTransaction {
    source: string;
    amount: number;
    date: string;
    icon?: string;
}

interface IncomeOverviewProps {
    transactions?: IncomeTransaction[];
    onAddIncome?: () => void;
}

const IncomeOverview = ({ transactions, onAddIncome }: IncomeOverviewProps) => {
    const chartData = useMemo(
        () => prepareIncomeBarChartData(transactions || []),
        [transactions]
    );

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div className="">
                    <h5 className="text-lg">Income Overview</h5>
                    <p className="text-xs text-gray-400 mt-0.5">Track your income sources and amounts over time.</p>
                </div>

                <button
                    onClick={onAddIncome}
                    className="add-btn"
                >
                    <LuPlus className="text-lg" />
                    Add Income
                </button>
            </div>

            <div className="mt-10">
                <CustomBarChart
                    data={chartData}
                />
            </div>
        </div>
    )
}

export default IncomeOverview
