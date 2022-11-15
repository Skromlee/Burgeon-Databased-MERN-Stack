import axios from "axios";

const API_URL = "/api/admin/"; // Need to create backend

//Login user

const login = async (adminData) => {
    const response = await axios.post(API_URL + "login", adminData);

    if (response.data) {
        localStorage.setItem("admin", JSON.stringify(response.data));
    }

    return response.data;
};

// Logout user
const logout = () => {
    localStorage.removeItem("admin");
};

const authService = {
    login,
    logout,
};

export default authService;
