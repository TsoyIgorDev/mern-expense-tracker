import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import axiosInstance from "../../utils/axiosIstance";
import { API_PATH } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import { showErrorModal, startLoading, stopLoading } from "./settingsSlice";
import type { LoginPayload, RegisterPayload, User } from "../types";

interface AuthResponse {
    token: string;
    user: User;
}

interface UserState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    authChecked: boolean;
}

const getErrorMessage = (error: unknown, fallback: string) => {
    const axiosError = error as AxiosError<{ message?: string } | string>;
    if (typeof axiosError.response?.data === "string") {
        return axiosError.response.data;
    }
    return axiosError.response?.data?.message || fallback;
};

const initialState: UserState = {
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: Boolean(localStorage.getItem("token")),
    authChecked: false,
};

export const loginUser = createAsyncThunk<AuthResponse, LoginPayload>(
    "user/loginUser",
    async (payload, { dispatch, rejectWithValue }) => {
        dispatch(startLoading());
        try {
            const response = await axiosInstance.post<AuthResponse>(API_PATH.AUTH.LOGIN, payload);
            localStorage.setItem("token", response.data.token);
            return response.data;
        } catch (error) {
            const message = getErrorMessage(error, "Unable to login right now.");
            dispatch(showErrorModal(message));
            return rejectWithValue(message);
        } finally {
            dispatch(stopLoading());
        }
    }
);

export const registerUser = createAsyncThunk<AuthResponse, RegisterPayload>(
    "user/registerUser",
    async (payload, { dispatch, rejectWithValue }) => {
        dispatch(startLoading());
        try {
            let profileImageUrl = "";

            if (payload.profilePic) {
                const imageResponse = await uploadImage(payload.profilePic);
                profileImageUrl = imageResponse.imageUrl || "";
            }

            const response = await axiosInstance.post<AuthResponse>(API_PATH.AUTH.REGISTER, {
                fullName: payload.fullName,
                email: payload.email,
                password: payload.password,
                profileImageUrl,
            });

            localStorage.setItem("token", response.data.token);
            return response.data;
        } catch (error) {
            const message = getErrorMessage(error, "Unable to create your account right now.");
            dispatch(showErrorModal(message));
            return rejectWithValue(message);
        } finally {
            dispatch(stopLoading());
        }
    }
);

export const fetchCurrentUser = createAsyncThunk<User>(
    "user/fetchCurrentUser",
    async (_, { dispatch, rejectWithValue }) => {
        dispatch(startLoading());
        try {
            const response = await axiosInstance.get<User>(API_PATH.AUTH.GET_USER_INFO);
            return response.data;
        } catch (error) {
            const message = getErrorMessage(error, "Unable to load your profile.");
            dispatch(showErrorModal(message));
            localStorage.removeItem("token");
            return rejectWithValue(message);
        } finally {
            dispatch(stopLoading());
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.authChecked = true;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.authChecked = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.authChecked = true;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.authChecked = true;
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.authChecked = true;
            })
            .addCase(loginUser.rejected, (state) => {
                state.authChecked = true;
            })
            .addCase(registerUser.rejected, (state) => {
                state.authChecked = true;
            });
    },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
