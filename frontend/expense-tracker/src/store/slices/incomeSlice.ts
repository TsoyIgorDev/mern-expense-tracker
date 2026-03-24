import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import axiosInstance from "../../utils/axiosIstance";
import { API_PATH } from "../../utils/apiPaths";
import { showErrorModal, startLoading, stopLoading } from "./settingsSlice";
import { logoutUser } from "./userSlice";
import type { AddIncomePayload, IncomeItem } from "../types";

interface IncomeState {
    items: IncomeItem[];
}

const initialState: IncomeState = {
    items: [],
};

const getErrorMessage = (error: unknown, fallback: string) => {
    const axiosError = error as AxiosError<{ message?: string } | string>;
    if (typeof axiosError.response?.data === "string") {
        return axiosError.response.data;
    }
    return axiosError.response?.data?.message || fallback;
};

export const fetchIncome = createAsyncThunk<IncomeItem[]>(
    "income/fetchIncome",
    async (_, { dispatch, rejectWithValue }) => {
        dispatch(startLoading());
        try {
            const response = await axiosInstance.get<IncomeItem[]>(API_PATH.INCOME.GET_ALL_INCOME);
            return response.data;
        } catch (error) {
            const message = getErrorMessage(error, "Unable to load income data.");
            dispatch(showErrorModal(message));
            return rejectWithValue(message);
        } finally {
            dispatch(stopLoading());
        }
    }
);

export const addIncome = createAsyncThunk<IncomeItem, AddIncomePayload>(
    "income/addIncome",
    async (payload, { dispatch, rejectWithValue }) => {
        dispatch(startLoading());
        try {
            const response = await axiosInstance.post<IncomeItem>(API_PATH.INCOME.ADD_INCOME, payload);
            return response.data;
        } catch (error) {
            const message = getErrorMessage(error, "Unable to add income.");
            dispatch(showErrorModal(message));
            return rejectWithValue(message);
        } finally {
            dispatch(stopLoading());
        }
    }
);

export const deleteIncome = createAsyncThunk<string, string>(
    "income/deleteIncome",
    async (incomeId, { dispatch, rejectWithValue }) => {
        dispatch(startLoading());
        try {
            await axiosInstance.delete(API_PATH.INCOME.DELETE_INCOME(incomeId));
            return incomeId;
        } catch (error) {
            const message = getErrorMessage(error, "Unable to delete income.");
            dispatch(showErrorModal(message));
            return rejectWithValue(message);
        } finally {
            dispatch(stopLoading());
        }
    }
);

const incomeSlice = createSlice({
    name: "income",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchIncome.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addIncome.fulfilled, (state, action) => {
                state.items = [action.payload, ...state.items];
            })
            .addCase(deleteIncome.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item._id !== action.payload);
            })
            .addCase(logoutUser, (state) => {
                state.items = [];
            });
    },
});

export default incomeSlice.reducer;
