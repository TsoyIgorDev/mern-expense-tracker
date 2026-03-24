import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import RecentIncome from "../../components/Dashboard/RecentIncome";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    addIncome as addIncomeAction,
    deleteIncome as deleteIncomeAction,
    fetchIncome,
} from "../../store/slices/incomeSlice";

type AddIncomeData = {
    amount: number;
    source: string;
    date: string;
    icon: string;
};

const Income = () => {
    const dispatch = useAppDispatch();
    const incomeData = useAppSelector((state) => state.income.items);
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState<boolean>(false);

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
            await dispatch(addIncomeAction({ source, amount, date, icon })).unwrap();
            setOpenAddIncomeModal(false);
            toast.success("Icome added succes");
        } catch (error) {
            console.error("Error adding income", error);
        }
    };

    const handleDeleteIncome = async (id: string) => {
        try {
            await dispatch(deleteIncomeAction(id)).unwrap();
            toast.success("Income details deleted");
        } catch (error) {
            console.error("Error delete income", error);
        }
    };

    useEffect(() => {
        dispatch(fetchIncome());
    }, [dispatch]);

    return (
        <DashboardLayout activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <IncomeOverview
                            transactions={incomeData}
                            onAddIncome={() => setOpenAddIncomeModal(true)}
                        />
                    </div>
                    <div>
                        <RecentIncome transactions={incomeData} onDelete={(id) => handleDeleteIncome(id)} />
                    </div>
                </div>
            </div>

            <Modal isOpen={openAddIncomeModal} onClose={() => setOpenAddIncomeModal(false)} title="Add Income">
                <AddIncomeForm onAddIncome={handleAddIncome} />
            </Modal>
        </DashboardLayout>
    );
};

export default Income;
