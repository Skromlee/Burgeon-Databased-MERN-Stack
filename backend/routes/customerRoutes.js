const express = require("express");
const router = express.Router();
const {
    updateCustomer,
    getCustomers,
    deleteCustomer,
} = require("../controllers/customerController");
const { adminProtect } = require("../middleware/adminAuthMiddleware");

// Customers
router.post("/customers/:id", adminProtect, updateCustomer);
router.get("/customers", adminProtect, getCustomers);
router.delete("/customers/:id", adminProtect, deleteCustomer);

module.exports = router;
