import { useMemo } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ['#875CF5', '#FA2C37', '#FF6900', '#4f39f6'];

interface RecentIncomeWithChartProps {
    data: Array<{
        source: string;
        amount: number;
    }>;
    totalIncome: number;
}

const RecentIncomeWithChart = ({ data, totalIncome }: RecentIncomeWithChartProps) => {
    const chartData = useMemo(() => (
        data.map((item) => ({
            name: item.source,
            amount: item.amount,
        }))
    ), [data]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 60 Days Income</h5>
            </div>

            <CustomPieChart
                data={chartData}
                label="Income"
                totalAmount={`${totalIncome}`}
                colors={COLORS}
                showTextAnchor={true}
            />
        </div>
    )
}

export default RecentIncomeWithChart
