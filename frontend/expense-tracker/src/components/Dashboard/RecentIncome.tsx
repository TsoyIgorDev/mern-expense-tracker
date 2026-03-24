import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";


interface RecentIncomeProps {
    transactions: Array<{
        _id: string;
        source: string;
        icon: string | undefined;
        date: string;
        amount: number;
    }>;
    onSeeMore?: () => void;
    onDelete?: (id: string) => void;
}


const RecentIncome = ({ transactions, onSeeMore, onDelete }: RecentIncomeProps) => {
    return (
        <div className='card'>
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Recent Income</h5>

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
                        title={item.source}
                        icon={item.icon}
                        date={moment(item.date).format("Do MMM YYYY")}
                        amount={item.amount}
                        type={"income"}
                        onDelete={() => onDelete?.(item._id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default RecentIncome