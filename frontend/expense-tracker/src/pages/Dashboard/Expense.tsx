import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import toast from "react-hot-toast";
import CustomPieChart from "../../components/Charts/CustomPieChart";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import Modal from "../../components/Modal";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    addExpense as addExpenseAction,
    deleteExpense as deleteExpenseAction,
    fetchExpense,
} from "../../store/slices/expenseSlice";

const COLORS = ["#FA2C37", "#FF6900", "#875CF5", "#4f39f6"];

interface AddExpenseData {
    amount: number;
    category: string;
    date: string;
    icon: string;
}

const Expense = () => {
    const dispatch = useAppDispatch();
    const expenseData = useAppSelector((state) => state.expense.items);
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState<boolean>(false);

    const chartData = expenseData.map((item) => ({
        name: item.category,
        amount: item.amount,
    }));

    const totalExpense = expenseData.reduce((sum, item) => sum + (item.amount || 0), 0);

    const handleAddExpense = async (expense: AddExpenseData) => {
        const { category, amount, date, icon } = expense;

        if (!category.trim()) {
            toast.error("Category is required");
            return;
        }

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Amount shoud be a valid number greater than 0");
            return;
        }

        if (!date) {
            toast.error("Date is required");
            return;
        }

        try {
            await dispatch(addExpenseAction({ category, amount, date, icon })).unwrap();
            setOpenAddExpenseModal(false);
            toast.success("Expense added succes");
        } catch (error) {
            console.error("Error adding expense", error);
        }
    };

    const handleDeleteExpense = async (id: string) => {
        try {
            await dispatch(deleteExpenseAction(id)).unwrap();
            toast.success("Expense details deleted");
        } catch (error) {
            console.error("Error delete expense", error);
        }
    };

    useEffect(() => {
        dispatch(fetchExpense());
        return () => { };
    }, [dispatch]);

    return (
        <DashboardLayout activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <div className="card">
                            <div className="flex items-center justify-between">
                                <h5 className="text-lg">Last 60 Days Expenses</h5>
                                <button
                                    onClick={() => setOpenAddExpenseModal(true)}
                                    className="add-btn"
                                >
                                    <LuPlus className="text-lg" />
                                    Add Expense
                                </button>
                            </div>

                            <CustomPieChart
                                data={chartData}
                                label="Expense"
                                totalAmount={`${totalExpense}`}
                                colors={COLORS}
                                showTextAnchor={true}
                            />
                        </div>
                    </div>

                    <div>
                        <ExpenseTransactions
                            transactions={expenseData}
                            onDelete={(id) => handleDeleteExpense(id)}
                        />
                    </div>
                </div>
            </div>

            <Modal
                isOpen={openAddExpenseModal}
                onClose={() => setOpenAddExpenseModal(false)}
                title="Add Expense"
            >
                <AddExpenseForm onAddExpense={handleAddExpense} />
            </Modal>
        </DashboardLayout>
    );
};

export default Expense;
