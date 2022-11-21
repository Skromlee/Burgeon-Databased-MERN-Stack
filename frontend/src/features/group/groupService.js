import axios from "axios";

const API_URL = "/api/groups/";

// Get Parcels
const getGroups = async (token) => {
    console.log("Gettingg.");
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
    console.log(groupData);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, groupData, config);
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

// update
const updateParcelData = async (updateParcelData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const parcelId = updateParcelData.parcel._id;
    const response = await axios.put(
        API_URL + parcelId,
        updateParcelData,
        config
    );
    return response.data;
};

// Delete parcel
const deleteParcel = async (deleteParcelId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(API_URL + deleteParcelId, config);
    return response.data;
};

const parcelService = {
    groupRegister,
    getGroupById,
    getGroups,
    updateParcelData,
    deleteParcel,
    getParcelByCitizen,
};

export default parcelService;
