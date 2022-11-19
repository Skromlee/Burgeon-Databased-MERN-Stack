const express = require("express");
const router = express.Router();
const {
    getInformationByPostcode,
} = require("../controllers/thailandController");
const { adminProtect } = require("../middleware/adminAuthMiddleware");

// Protect Middleware goes here

router.get("/:postcode", adminProtect, getInformationByPostcode);

module.exports = router;
