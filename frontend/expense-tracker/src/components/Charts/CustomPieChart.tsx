import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { addThousandsSeparator } from "../../utils/helper";
interface CustomPieChartProps {
    data: Array<{
        name: string;
        amount: number;
    }>;
    label: string;
    totalAmount: string;
    colors: string[];
    showTextAnchor: boolean;
}

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }: CustomPieChartProps) => {
    return (
        <ResponsiveContainer width="100%" height={380}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey={"amount"}
                    nameKey={"name"}
                    cx={'50%'}
                    cy={'50%'}
                    outerRadius={130}
                    innerRadius={100}
                    labelLine={false}
                >
                    {data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
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
                <Legend
                    iconType="circle"
                    formatter={(value) => (
                        <span style={{ color: '#333' }}>{value}</span>
                    )}
                />

                {showTextAnchor && (
                    <>
                        <text
                            x="50%"
                            y="50%"
                            dy={-25}
                            textAnchor="middle"
                            fill="#666"
                            fontSize="14px"
                        >{label}</text>

                        <text
                            x="50%"
                            y="50%"
                            dy={8}
                            textAnchor="middle"
                            fill="#333"
                            fontSize="24px"
                            fontWeight="semi-bold"
                        >${addThousandsSeparator(totalAmount)}</text>
                    </>
                )}
            </PieChart>
        </ResponsiveContainer>
    )
}

export default CustomPieChart
