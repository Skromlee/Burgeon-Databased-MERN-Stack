import axios from "axios";

const API_URL = "/api/parcels/";

// Get Parcels
const getParcels = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, config);
    return response.data;
};

// Get Parcelbyid
const getParcelById = async (parcelId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + parcelId, config);
    return response.data;
};

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

// Register

const parcelRegister = async (parcelData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, parcelData, config);
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
    parcelRegister,
    getParcelById,
    getParcels,
    updateParcelData,
    deleteParcel,
    getParcelByCitizen,
};

export default parcelService;
