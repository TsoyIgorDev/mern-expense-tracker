import { useEffect } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import NotFound from "./pages/NotFound";
import GlobalErrorModal from "./components/feedback/GlobalErrorModal";
import GlobalLoader from "./components/feedback/GlobalLoader";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchCurrentUser } from "./store/slices/userSlice";

const Root = () => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

const App = () => {
  const dispatch = useAppDispatch();
  const { authChecked, isAuthenticated, user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!authChecked && isAuthenticated && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [authChecked, dispatch, isAuthenticated, user]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      <GlobalLoader />
      <GlobalErrorModal />
      <Toaster
        toastOptions={{
          className: "",
          style: { fontSize: "13px" },
        }}
      />
    </>
  );
};

export default App;
