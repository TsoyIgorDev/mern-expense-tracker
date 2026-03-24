import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import axiosInstance from "../../utils/axiosIstance";
import { API_PATH } from "../../utils/apiPaths";
import { showErrorModal, startLoading, stopLoading } from "./settingsSlice";
import { logoutUser } from "./userSlice";
import type { DashboardData } from "../types";

interface DashboardState {
    data: DashboardData | null;
}

const initialState: DashboardState = {
    data: null,
};

const getErrorMessage = (error: unknown, fallback: string) => {
    const axiosError = error as AxiosError<{ message?: string } | string>;
    if (typeof axiosError.response?.data === "string") {
        return axiosError.response.data;
    }
    return axiosError.response?.data?.message || fallback;
};

export const fetchDashboardData = createAsyncThunk<DashboardData>(
    "dashboard/fetchDashboardData",
    async (_, { dispatch, rejectWithValue }) => {
        dispatch(startLoading());
        try {
            const response = await axiosInstance.get<DashboardData>(API_PATH.DASHBOARD.GET_DATA);
            return response.data;
        } catch (error) {
            const message = getErrorMessage(error, "Unable to load dashboard data.");
            dispatch(showErrorModal(message));
            return rejectWithValue(message);
        } finally {
            dispatch(stopLoading());
        }
    }
);

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(logoutUser, (state) => {
                state.data = null;
            });
    },
});

export default dashboardSlice.reducer;
