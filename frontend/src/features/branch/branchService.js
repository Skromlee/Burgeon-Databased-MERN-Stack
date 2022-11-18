import axios from "axios";

const API_URL = "/api/branch/";

// Create new branch
const createBranch = async (branchData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, branchData, config);
    return response.data;
};

// Get branchs data
const getBranchs = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, config);

    return response.data;
};

// Update branch data
const updateBranch = async (branchData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(
        API_URL + branchData._id,
        branchData,
        config
    );

    return response.data;
};

//Delete branch
const deleteBranch = async (branchId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(API_URL + branchId, config);

    return response.data;
};

const branchService = {
    createBranch,
    getBranchs,
    updateBranch,
    deleteBranch,
};

export default branchService;
