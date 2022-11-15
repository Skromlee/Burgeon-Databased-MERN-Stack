const express = require("express");
const router = express.Router();
const {
    registerAdmin,
    loginAdmin,
    // getMe,
    // updateUser,
} = require("../controllers/adminController");
// const { protect } = require("../middleware/authMiddleware");
const { adminProtect } = require("../middleware/adminAuthMiddleware");

// Protect Middleware goes here

router.post("/", adminProtect, registerAdmin);
router.post("/login", loginAdmin);
// router.get("/me", protect, getMe);
// router.put("/:id", protect, updateUser);

module.exports = router;
