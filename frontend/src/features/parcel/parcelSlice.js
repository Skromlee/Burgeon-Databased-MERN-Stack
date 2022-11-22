import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import parcelService from "./parcelService";

const initialState = {
    parcels: [],
    parcelbyid: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Get parcel
export const getParcels = createAsyncThunk(
    "parcel/getParcel",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            return await parcelService.getParcels(token);
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

// Get parcel By citizen
export const getParcelByCitizen = createAsyncThunk(
    "parcel/getParcelByCitizen",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await parcelService.getParcelByCitizen(token);
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

// Get parcel By id
export const getParcelById = createAsyncThunk(
    "parcel/getParcelById",
    async (parcelId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            return await parcelService.getParcelById(parcelId, token);
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

// Update parcel
export const parcelUpdate = createAsyncThunk(
    "parcel/parcelupdate",
    async (updateParcelData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            return await parcelService.updateParcelData(
                updateParcelData,
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

// Update parcel status
export const updateStatus = createAsyncThunk(
    "parcel/updateStatus",
    async (updatedStatusData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            return await parcelService.updateStatus(updatedStatusData, token);
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

// Delete parcel
export const deleteParcel = createAsyncThunk(
    "parcel/deleteparcel",
    async (deleteParcelId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            return await parcelService.deleteParcel(deleteParcelId, token);
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
            })
            .addCase(getParcels.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getParcels.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.parcels = action.payload;
            })
            .addCase(getParcels.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getParcelById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getParcelById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.parcelbyid = action.payload;
            })
            .addCase(getParcelById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(parcelUpdate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(parcelUpdate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.parcels = state.parcels.filter((each) => {
                    return each._id !== action.payload._id;
                });
                state.parcels.push(action.payload);
            })
            .addCase(deleteParcel.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteParcel.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.parcels = state.parcels.filter((each) => {
                    return each._id !== action.payload.id;
                });
            })
            .addCase(getParcelByCitizen.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getParcelByCitizen.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.parcels = action.payload;
            })
            .addCase(getParcelByCitizen.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.parcels = null;
            })
            .addCase(updateStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.parcels = state.parcels.filter((each) => {
                    return each._id !== action.payload._id;
                });
                state.parcels.push(action.payload);
                state.parcelStatus = action.payload;
                state.parcelStatuscheck = true;
            })
            .addCase(updateStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = parcelSlice.actions;
export default parcelSlice.reducer;
