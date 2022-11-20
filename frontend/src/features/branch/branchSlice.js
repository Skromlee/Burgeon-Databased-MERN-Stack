import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import branchService from "./branchService";

const initialState = {
    branch: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Create new branch
export const createBranch = createAsyncThunk(
    "branch/create",
    async (branchData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token; // use admin token to confirm
            return await branchService.createBranch(branchData, token);
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

// Get branchs data
export const getBranchs = createAsyncThunk(
    "branch/getAll",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            return await branchService.getBranchs(token);
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

// Update branch data
export const updateBranch = createAsyncThunk(
    "branch/update",
    async (branchData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            return await branchService.updateBranch(branchData, token); // create
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

// Delete branch data
export const deleteBranch = createAsyncThunk(
    "branch/delete",
    async (branchId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            return await branchService.deleteBranch(branchId, token);
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

export const branchSlice = createSlice({
    name: "branch",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createBranch.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBranch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.branch.push(action.payload);
            })
            .addCase(createBranch.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getBranchs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBranchs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.branch = action.payload;
            })
            .addCase(getBranchs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateBranch.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBranch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.branch = state.branch.filter(
                    (branch) => branch._id !== action.payload._id
                );
                state.branch.push(action.payload);
            })
            .addCase(updateBranch.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteBranch.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBranch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.branch = state.branch.filter((branch) => {
                    return branch._id !== action.payload.id;
                });
            })
            .addCase(deleteBranch.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = branchSlice.actions;
export default branchSlice.reducer;
