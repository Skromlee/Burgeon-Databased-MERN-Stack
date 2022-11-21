import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import adminReducer from "../features/admin/adminSlice";
import employeeReducer from "../features/employee/employeeSlice";
import customerReducer from "../features/customer/customerSlice";
import parcelReducer from "../features/parcel/parcelSlice";
import branchReducer from "../features/branch/branchSlice";
import thailandReducer from "../features/thailand/thailandSlice";
import groupReducer from "../features/group/groupSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        employee: employeeReducer,
        customer: customerReducer,
        parcels: parcelReducer,
        branch: branchReducer,
        thailand: thailandReducer,
        group: groupReducer,
    },
});
