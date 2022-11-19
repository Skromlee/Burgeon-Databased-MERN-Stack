import axios from "axios";

const API_URL = "/api/thailand/";

// Update employees data
const getInformationByPostcode = async (postcode, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + postcode, config);

    return response.data;
};

const thailandService = { getInformationByPostcode };

export default thailandService;
