import { useCallback, useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout"
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosIstance";
import { API_PATH } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import RecentIncome from "../../components/Dashboard/RecentIncome";
import toast from "react-hot-toast";

interface IncomeData {
    _id: string;
    type: string;
    amount: number;
    source: string;
    date: string;
    icon: string;
}

interface AddIncomeData {
    amount: number;
    source: string;
    date: string;
    icon: string;
}

const Income = () => {
    const [incomeData, setIncomeData] = useState<IncomeData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState<boolean>(false);

    const fetchIncomeDetails = useCallback(async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosInstance.get(`${API_PATH.INCOME.GET_ALL_INCOME}`);
            if (response.data) {
                setIncomeData(response.data);
            }
        } catch (error) {
            console.error("Please try again", error);
        } finally {
            setLoading(false);
        }
    }, [loading]);

    const handleAddIncome = async (income: AddIncomeData) => {
        const { source, amount, date, icon } = income;

        if (!source.trim()) {
            toast.error("Source is required");
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
            await axiosInstance.post(API_PATH.INCOME.ADD_INCOME, {
                source, amount, date, icon,
            });

            setOpenAddIncomeModal(false);
            toast.success("Icome added succes");
            fetchIncomeDetails();
        } catch (error) {
            console.error("Error adding income", error);
        }
    };

    const deleteIncome = async (id: string) => {
        try {
            await axiosInstance.delete(API_PATH.INCOME.DELETE_INCOME(id))
            toast.success("Income details deleted");
            fetchIncomeDetails();
        } catch (error) {
            console.error("Error delete income", error);
        }
    };

    useEffect(() => {
        fetchIncomeDetails();
    }, [fetchIncomeDetails])
    return (
        <DashboardLayout activeMenu="Income">
            <div className='my-5 mx-auto'>
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <IncomeOverview
                            transactions={incomeData}
                            onAddIncome={() => setOpenAddIncomeModal(true)}
                        />
                    </div>
                    <div>
                        <RecentIncome transactions={incomeData} onDelete={(id) => deleteIncome(id)} />
                    </div>
                </div>
            </div>

            <Modal isOpen={openAddIncomeModal} onClose={() => setOpenAddIncomeModal(false)} title="Add Income">
                <AddIncomeForm onAddIncome={handleAddIncome} />
            </Modal>
        </DashboardLayout>
    )
}

export default Income
