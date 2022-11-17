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

const parcelService = {
    parcelRegister,
    getParcels,
};

export default parcelService;
