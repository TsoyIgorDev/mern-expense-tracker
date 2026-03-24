import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./slices/dashboardSlice";
import expenseReducer from "./slices/expenseSlice";
import incomeReducer from "./slices/incomeSlice";
import settingsReducer from "./slices/settingsSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        settings: settingsReducer,
        income: incomeReducer,
        expense: expenseReducer,
        dashboard: dashboardReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
