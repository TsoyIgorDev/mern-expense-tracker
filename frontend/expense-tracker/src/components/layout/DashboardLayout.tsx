import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { useAppSelector } from "../../store/hooks";

interface DashboardLayoutProps {
    children: React.ReactNode,
    activeMenu: string,
}

const DashboardLayout = ({ children, activeMenu }: DashboardLayoutProps) => {
    const user = useAppSelector((state) => state.user.user);
    return (
        <div className=''>
            <Navbar activeMenu={activeMenu} />

            {user && (
                <div className="flex">
                    <div className='max-[1080px]:hidden'>
                        <SideMenu activeMenu={activeMenu} />
                    </div>

                    <div className='grow mx-5'>{children}</div>
                </div>
            )}
        </div>
    )
}

export default DashboardLayout
