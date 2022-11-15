import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerService from "./customerService";

const initialState = {
    customer: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Create new customer
export const createCustomers = createAsyncThunk(
    "customer/create",
    async (customerData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token; // use admin token to confirm
            return await customerService.createCustomer(customerData, token);
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

// Get customers data
export const getCustomers = createAsyncThunk(
    "customer/getAll",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            return await customerService.getCustomers(token);
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

// Update customer data
export const updateCustomer = createAsyncThunk(
    "customer/update",
    async (customerData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            return await customerService.updateCustomer(customerData, token); // create
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

// Delete customer data
export const deleteCustomer = createAsyncThunk(
    "customer/delete",
    async (customerId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            return await customerService.deleteCustomer(customerId, token);
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

export const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCustomers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCustomers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.customer.push(action.payload);
            })
            .addCase(createCustomers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getCustomers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCustomers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.customer = action.payload;
            })
            .addCase(getCustomers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateCustomer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;

                state.customer = state.customer.filter(
                    (customer) => customer._id !== action.payload._id
                );
                state.customer.push(action.payload);
            })
            .addCase(updateCustomer.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;

                state.message = action.payload;
            })
            .addCase(deleteCustomer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.customer = state.customer.filter((customer) => {
                    return customer._id !== action.payload.id;
                });
            })
            .addCase(deleteCustomer.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = customerSlice.actions;
export default customerSlice.reducer;
