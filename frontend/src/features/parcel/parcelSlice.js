import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import parcelService from "./parcelService";

const initialState = {
    parcels: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Register parcel
export const parcelRegister = createAsyncThunk(
    "parcel/parcelRegister",
    async (parcelData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            return await parcelService.parcelRegister(parcelData, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const parcelSlice = createSlice({
    name: "parcel",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(parcelRegister.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(parcelRegister.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.parcels.push(action.payload);
            })
            .addCase(parcelRegister.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = parcelSlice.actions;
export default parcelSlice.reducer;
