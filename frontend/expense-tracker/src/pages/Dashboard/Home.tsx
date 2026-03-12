import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosIstance';
import { API_PATH } from '../../utils/apiPaths';
import InfoCard from '../../components/Cards/InfoCard';
import { IoMdCard } from 'react-icons/io'
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu'
import { addThousandsSeparator } from '../../utils/helper';

const Home = () => {
    useUserAuth();
    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const fetchDashboardData = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosInstance.get(`${API_PATH.DASHBOARD.GET_DATA}`);
            if (response.data) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.error("Please try again", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDashboardData();
        return () => { };
    }, [])

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className='my-5 mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <InfoCard
                        icon={<IoMdCard />}
                        label="Total Balance"
                        value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
                        color="bg-primary"
                    />

                    <InfoCard
                        icon={<LuHandCoins />}
                        label="Total Income"
                        value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
                        color="bg-orange-500"
                    />

                    <InfoCard
                        icon={<LuWalletMinimal />}
                        label="Total Expense"
                        value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
                        color="bg-red-500"
                    />
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Home