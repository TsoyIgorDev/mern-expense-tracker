import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import axiosInstance from "../../utils/axiosIstance";
import { API_PATH } from "../../utils/apiPaths";
import { showErrorModal, startLoading, stopLoading } from "./settingsSlice";
import { logoutUser } from "./userSlice";
import type { AddExpensePayload, ExpenseItem } from "../types";

interface ExpenseState {
    items: ExpenseItem[];
}

const initialState: ExpenseState = {
    items: [],
};

const getErrorMessage = (error: unknown, fallback: string) => {
    const axiosError = error as AxiosError<{ message?: string } | string>;
    if (typeof axiosError.response?.data === "string") {
        return axiosError.response.data;
    }
    return axiosError.response?.data?.message || fallback;
};

export const fetchExpense = createAsyncThunk<ExpenseItem[]>(
    "expense/fetchExpense",
    async (_, { dispatch, rejectWithValue }) => {
        dispatch(startLoading());
        try {
            const response = await axiosInstance.get<ExpenseItem[]>(API_PATH.EXPENSE.GET_ALL_EXPENSE);
            return response.data;
        } catch (error) {
            const message = getErrorMessage(error, "Unable to load expense data.");
            dispatch(showErrorModal(message));
            return rejectWithValue(message);
        } finally {
            dispatch(stopLoading());
        }
    }
);

export const addExpense = createAsyncThunk<ExpenseItem, AddExpensePayload>(
    "expense/addExpense",
    async (payload, { dispatch, rejectWithValue }) => {
        dispatch(startLoading());
        try {
            const response = await axiosInstance.post<ExpenseItem>(API_PATH.EXPENSE.ADD_EXPENSE, payload);
            return response.data;
        } catch (error) {
            const message = getErrorMessage(error, "Unable to add expense.");
            dispatch(showErrorModal(message));
            return rejectWithValue(message);
        } finally {
            dispatch(stopLoading());
        }
    }
);

export const deleteExpense = createAsyncThunk<string, string>(
    "expense/deleteExpense",
    async (expenseId, { dispatch, rejectWithValue }) => {
        dispatch(startLoading());
        try {
            await axiosInstance.delete(API_PATH.EXPENSE.DELETE_EXPENSE(expenseId));
            return expenseId;
        } catch (error) {
            const message = getErrorMessage(error, "Unable to delete expense.");
            dispatch(showErrorModal(message));
            return rejectWithValue(message);
        } finally {
            dispatch(stopLoading());
        }
    }
);

const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExpense.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.items = [action.payload, ...state.items];
            })
            .addCase(deleteExpense.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item._id !== action.payload);
            })
            .addCase(logoutUser, (state) => {
                state.items = [];
            });
    },
});

export default expenseSlice.reducer;
