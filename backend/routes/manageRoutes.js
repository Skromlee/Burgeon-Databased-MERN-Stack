const express = require("express");
const router = express.Router();
const {
    registerEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee,
    updateCustomer,
    getCustomers,
    deleteCustomer,
} = require("../controllers/manageController");
const { adminProtect } = require("../middleware/adminAuthMiddleware");

// Protect Middleware goes here

// Employees
router.post("/employees", adminProtect, registerEmployee);
router.post("/employees/:id", adminProtect, updateEmployee);
router.get("/employees", adminProtect, getEmployees);
router.delete("/employees/:id", adminProtect, deleteEmployee);

// Customers
router.post("/customers/:id", adminProtect, updateCustomer);
router.get("/customers", adminProtect, getCustomers);
router.delete("/customers/:id", adminProtect, deleteCustomer);

module.exports = router;
