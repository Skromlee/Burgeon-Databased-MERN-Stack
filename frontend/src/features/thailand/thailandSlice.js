import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import thailandService from "./thailandService";

const initialState = {
    informationFromPostcode: [],
    senderInformation: [],
    receiverInformation: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    isFirsttime: true,
    message: "",
};

// Get information by postcode
export const SenderGetInformationFromPostcode = createAsyncThunk(
    "thailand/SenderGetInformationFromPostcode",
    async (postcode, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token; // use admin token to confirm
            return await thailandService.getInformationByPostcode(
                postcode,
                token
            );
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
// Get information by postcode
export const ReceiverGetInformationFromPostcode = createAsyncThunk(
    "thailand/ReceiverGetInformationFromPostcode",
    async (postcode, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token; // use admin token to confirm
            return await thailandService.getInformationByPostcode(
                postcode,
                token
            );
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
// Get information by postcode
export const getInformationFromPostcode = createAsyncThunk(
    "thailand/getInformationFromPostcode",
    async (postcode, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token; // use admin token to confirm
            return await thailandService.getInformationByPostcode(
                postcode,
                token
            );
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

export const thailandSlice = createSlice({
    name: "thailand",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getInformationFromPostcode.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getInformationFromPostcode.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;

                if (state.isFirsttime) {
                    state.mokeUp = action.payload;
                }
                state.informationFromPostcode = action.payload;
            })
            .addCase(getInformationFromPostcode.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(SenderGetInformationFromPostcode.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                SenderGetInformationFromPostcode.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;

                    if (state.isFirsttime) {
                        state.mokeUp = action.payload;
                    }
                    state.senderInformation = action.payload;
                }
            )
            .addCase(
                SenderGetInformationFromPostcode.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                }
            )
            .addCase(ReceiverGetInformationFromPostcode.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                ReceiverGetInformationFromPostcode.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;

                    if (state.isFirsttime) {
                        state.mokeUp = action.payload;
                    }
                    state.receiverInformation = action.payload;
                }
            )
            .addCase(
                ReceiverGetInformationFromPostcode.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                }
            );
    },
});

export const { reset } = thailandSlice.actions;
export default thailandSlice.reducer;
