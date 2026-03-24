import CustomPieChart from '../Charts/CustomPieChart';

interface FinanceOverviewProps {
    totalBalance: number;
    totalIncome: number;
    totalExpense: number;
}

const COLORS = ['#875CF5', '#FA2C37', '#FF6900'];


const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }: FinanceOverviewProps) => {
    const balancedData = [
        { name: 'Total Balance', amount: totalBalance },
        { name: 'Total Income', amount: totalIncome },
        { name: 'Total Expense', amount: totalExpense },
    ]
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className="text-lg">Finance Overview</h5>
            </div>

            <CustomPieChart
                data={balancedData}
                label="Total Balance"
                totalAmount={`${totalBalance}`}
                colors={COLORS}
                showTextAnchor={true}
            />
        </div>
    )
}

export default FinanceOverview
