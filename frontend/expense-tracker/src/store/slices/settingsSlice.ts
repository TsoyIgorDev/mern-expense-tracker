import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
    loadingCount: number;
    isErrorModalOpen: boolean;
    errorMessage: string;
}

const initialState: SettingsState = {
    loadingCount: 0,
    isErrorModalOpen: false,
    errorMessage: "",
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loadingCount += 1;
        },
        stopLoading: (state) => {
            state.loadingCount = Math.max(0, state.loadingCount - 1);
        },
        showErrorModal: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
            state.isErrorModalOpen = true;
        },
        closeErrorModal: (state) => {
            state.isErrorModalOpen = false;
            state.errorMessage = "";
        },
    },
});

export const { startLoading, stopLoading, showErrorModal, closeErrorModal } = settingsSlice.actions;
export default settingsSlice.reducer;
