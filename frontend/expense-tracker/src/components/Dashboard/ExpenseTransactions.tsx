import { LuArrowRight } from "react-icons/lu"
import moment from 'moment'
import TransactionInfoCard from "../Cards/TransactionInfoCard";


interface ExpenseTransactionsProps {
    transactions: Array<{
        _id: string;
        category: string;
        icon: string | undefined;
        date: string;
        amount: number;
        type: string;
    }>;
    onSeeMore?: () => void;
    onDelete?: (id: string) => void;
}

const ExpenseTransactions = ({ transactions, onSeeMore, onDelete }: ExpenseTransactionsProps) => {
    return (
        <div className='card'>
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Expenses</h5>

                {onSeeMore && (
                    <button className="card-btn" onClick={onSeeMore}>
                        See All <LuArrowRight className="text-base" />
                    </button>
                )}
            </div>

            <div className="mt-6">
                {transactions?.slice(0, 5).map((item) => (
                    <TransactionInfoCard
                        key={item._id}
                        id={item._id}
                        title={item.category}
                        icon={item.icon}
                        date={moment(item.date).format("Do MMM YYYY")}
                        amount={item.amount}
                        type={item.type}
                        onDelete={() => onDelete?.(item._id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ExpenseTransactions
