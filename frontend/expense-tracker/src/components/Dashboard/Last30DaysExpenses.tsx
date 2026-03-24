import { useMemo } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

interface Last30DaysExpensesProps {
    data: Array<{
        category: string;
        amount: number;
    }>;
}

const Last30DaysExpenses = ({ data }: Last30DaysExpensesProps) => {
    const chartData = useMemo(() => prepareExpenseBarChartData(data), [data]);

    return (
        <div className="card col-span-1">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 30 Days Expenses</h5>
            </div>


            <CustomBarChart data={chartData} />
        </div>
    )
}

export default Last30DaysExpenses
