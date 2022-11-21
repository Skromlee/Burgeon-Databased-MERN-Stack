import axios from "axios";

const API_URL = "/api/groups/";

// Get Parcels
const getGroups = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, config);
    return response.data;
};

// Get GroupById
const getGroupById = async (groupId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + groupId, config);
    return response.data;
};

// Register
const groupRegister = async (groupData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, groupData, config);
    return response.data;
};

// update
const updateGroupData = async (updateGroupData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const groupId = updateGroupData._id;
    const response = await axios.put(
        API_URL + groupId,
        updateGroupData,
        config
    );
    return response.data;
};

// Delete group
const deleteGroup = async (deleteGroupId, token) => {
    console.log("Service ++");
    console.log("deleteGroupId: ", deleteGroupId);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(API_URL + deleteGroupId, config);
    return response.data;
};

// ----------------------------------------------------

// Get ParcelByCitizen
const getParcelByCitizen = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + "all", config);
    return response.data;
};

const groupService = {
    groupRegister,
    getGroupById,
    getGroups,
    updateGroupData,
    deleteGroup,
    getParcelByCitizen,
};

export default groupService;
