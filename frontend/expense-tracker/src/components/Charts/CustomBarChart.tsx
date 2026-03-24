import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface ChartDataItem {
    category?: string;
    month?: string;
    amount: number;
}

interface CustomBarChartProps {
    data: ChartDataItem[];
}

const CustomBarChart = ({ data }: CustomBarChartProps) => {

    const getBarColor = (index: number) => {
        return index % 2 === 0 ? "#875cf5" : "#cfbefb"
    }

    return (
        <div className="bg-white mt-6">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke="none" />

                    <XAxis
                        dataKey={data[0]?.category !== undefined ? "category" : "month"}
                        tick={{ fontSize: 12, fill: "#555" }}
                        stroke="none"
                    />
                    <YAxis
                        tick={{ fontSize: 12, fill: "#555" }}
                        stroke="none"
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        labelStyle={{ color: '#333', fontWeight: 'bold' }}
                        formatter={(value: number | undefined) => {
                            return [`$${value?.toLocaleString() || '0'}`, null];
                        }}
                    />

                    <Bar
                        dataKey={"amount"}
                        radius={[10, 10, 0, 0]}
                    >
                        {data.map((_, index) => (
                            <Cell key={index} fill={getBarColor(index)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomBarChart;
