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

// Update group
export const groupUpdate = createAsyncThunk(
    "group/groupUpdate",
    async (updateGroupData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            return await groupService.updateGroupData(updateGroupData, token);
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

// Delete group
export const deleteGroup = createAsyncThunk(
    "group/deleteGroup",
    async (deleteGroupId, thunkAPI) => {
        console.log("deleteGroupId: ", deleteGroupId);
        try {
            const token = thunkAPI.getState().admin.admin.token;
            return await groupService.deleteGroup(deleteGroupId, token);
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

export const groupSlice = createSlice({
    name: "group",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
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
            .addCase(groupUpdate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(groupUpdate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.groups = state.groups.filter((each) => {
                    return each._id !== action.payload._id;
                });
                state.groups.push(action.payload);
            })
            .addCase(groupUpdate.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteGroup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteGroup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                let removedGroup = [];
                removedGroup.push(
                    state.groups.filter((each) => {
                        return each._id !== action.payload.id;
                    })
                );
                state.groups = removedGroup[0];
            })
            .addCase(deleteGroup.rejected, (state, action) => {
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
