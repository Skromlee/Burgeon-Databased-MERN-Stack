import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import groupService from "./groupService";

const initialState = {
    groups: [],
    groupedParcels: [],
    ungroupedParcels: [],
    groupbyid: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Get Groups
export const getGroups = createAsyncThunk(
    "group/getGroups",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            return await groupService.getGroups(token);
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

// Get groups By id
export const getGroupById = createAsyncThunk(
    "group/getGroupById",
    async (groupId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            return await groupService.getParcelById(groupId, token);
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

// Register Groups
export const groupRegister = createAsyncThunk(
    "group/groupRegister",
    async (groupData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            return await groupService.groupRegister(groupData, token);
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

// ---------------------------------------------------------------

// Get parcel By citizen
export const getParcelByCitizen = createAsyncThunk(
    "parcel/getParcelByCitizen",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await groupService.getParcelByCitizen(token);
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
            return await groupService.updateParcelData(updateParcelData, token);
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
            return await groupService.deleteParcel(deleteParcelId, token);
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

export const groupSlice = createSlice({
    name: "group",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGroups.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGroups.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.groups = action.payload;
            })
            .addCase(getGroups.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getGroupById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGroupById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.groupbyid = action.payload;
            })
            .addCase(getGroupById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // -----------------------------------------------
            .addCase(groupRegister.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(groupRegister.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.groups.push(action.payload);
            })
            .addCase(groupRegister.rejected, (state, action) => {
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
                state.groups = state.groups.filter((each) => {
                    return each._id !== action.payload._id;
                });
                state.groups.push(action.payload);
            })
            .addCase(deleteParcel.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteParcel.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.groups = state.groups.filter((each) => {
                    return each._id !== action.payload.id;
                });
            })
            .addCase(getParcelByCitizen.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getParcelByCitizen.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.groups = action.payload;
            })
            .addCase(getParcelByCitizen.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.groups = null;
            });
    },
});

export const { reset } = groupSlice.actions;
export default groupSlice.reducer;
