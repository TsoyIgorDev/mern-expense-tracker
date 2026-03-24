import { useEffect, useState } from "react"
import { LuPlus } from "react-icons/lu";
import CustomPieChart from "../../components/Charts/CustomPieChart";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions"
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import Modal from "../../components/Modal";
import DashboardLayout from "../../components/layout/DashboardLayout"
import axiosInstance from "../../utils/axiosIstance";
import { API_PATH } from "../../utils/apiPaths";
import toast from "react-hot-toast";

const COLORS = ['#FA2C37', '#FF6900', '#875CF5', '#4f39f6'];

interface ExpenseData {
    _id: string;
    type: string;
    amount: number;
    category: string;
    date: string;
    icon: string;
}

interface AddExpenseData {
    amount: number;
    category: string;
    date: string;
    icon: string;
}

const Expense = () => {
    const [expenseData, setExpenseData] = useState<ExpenseData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
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
            await axiosInstance.post(API_PATH.EXPENSE.ADD_EXPENSE, {
                category, amount, date, icon,
            });

            setOpenAddExpenseModal(false);
            toast.success("Expense added succes");
            fetchExpenseDetails();
        } catch (error) {
            console.error("Error adding expense", error);
        }
    };

    const deleteExpense = async (id: string) => {
        try {
            await axiosInstance.delete(API_PATH.EXPENSE.DELETE_EXPENSE(id));
            toast.success("Expense details deleted");
            fetchExpenseDetails();
        } catch (error) {
            console.error("Error delete expense", error);
        }
    };

    const fetchExpenseDetails = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosInstance.get(`${API_PATH.EXPENSE.GET_ALL_EXPENSE}`);
            if (response.data) {
                setExpenseData(response.data);
            }
        } catch (error) {
            console.error("Please try again", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenseDetails();
        return () => { };
    }, [])
    return (
        <DashboardLayout activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
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
                        <ExpenseTransactions transactions={expenseData} onDelete={(id) => deleteExpense(id)} />
                    </div>
                </div>
            </div>

            <Modal isOpen={openAddExpenseModal} onClose={() => setOpenAddExpenseModal(false)} title="Add Expense">
                <AddExpenseForm onAddExpense={handleAddExpense} />
            </Modal>
        </DashboardLayout>
    )
}

export default Expense
