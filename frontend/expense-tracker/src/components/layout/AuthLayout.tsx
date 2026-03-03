import React from 'react'
import CARD from '../../assets/images/card.png'

interface AuthLayoutProps {
    children: React.ReactNode,
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className='flex'>
            <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
                <h2 className='text-4xl font-medium text-theme-primary'>Expense Tracker</h2>
                {children}
            </div>


            <div className='hidden w-[40vw] md:block h-screen bg-theme-secondary bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative'>
                <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5"></div>
                <div className="w-48 h-58 rounded-[40px] border-fuchsia-600 border-20 absolute top-[20%] -right-10 "></div>
                <div className="w-70 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5"></div>

                <img src={CARD} className='w-64 lg:w-[90%] absolute bottom-60 shadow-lg rounded-2xl' />
            </div>
        </div>
    )
}

export default AuthLayout
