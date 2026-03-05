import React, { createContext, useEffect, useState } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa';

import {
  BrowserRouter as Router, Routes, Route, Navigate,
  createBrowserRouter
} from "react-router-dom"
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense'
import UserProvider from './context/UserContext';

type ThemeContextType = {
  theme: string,
  toggleTheme: () => void,
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// TODO - можно улучшить на createBrowserRouter и добавить защиту
const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
}

const App = () => {
  const [theme, setTheme] = useState<String>('light');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? "dark" : "light"));
  }

  return (
    <UserProvider>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <button
          onClick={toggleTheme}
          className="fixed top-4 right-4 z-50 p-3 rounded-full w-16 h-8 flex justify-center items-center bg-primary text-white hover:opacity-90 transition-all"
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </button>
        < div >
          <Router>
            <Routes>
              <Route path='/' element={<Root />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signUp' element={<SignUp />} />
              <Route path='/dashboard' element={<Home />} />
              <Route path='/income' element={<Income />} />
              <Route path='/expense' element={<Expense />} />
            </Routes>
          </Router>
        </div >
      </ThemeContext.Provider>
    </UserProvider>
  )
}

export default App