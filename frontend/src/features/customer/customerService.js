import axios from "axios";

const API_URL = "/api/manages/customers/";
const USER_URL = "/api/users/";

// Create new employee use same route as post => user
const createCustomer = async (userData) => {
    const response = await axios.post(USER_URL, userData);
    return response.data;
};

// Get employees data use new route
const getCustomers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, config);

    return response.data;
};

// Update employees data
const updateCustomer = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL + userData._id, userData, config);

    return response.data;
};

//Delete employee
const deleteCustomer = async (userId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(API_URL + userId, config);

    return response.data;
};

const employeeService = {
    createCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer,
};

export default employeeService;
