const express = require("express");
const router = express.Router();
const {
    createBranch,
    getBranchs,
    updateBranch,
    deleteBranch,
} = require("../controllers/branchController");

// Protect Middleware goes here
const { adminProtect } = require("../middleware/adminAuthMiddleware");

// @desc /api/branch
router.post("/", adminProtect, createBranch);
router.get("/", adminProtect, getBranchs);
router.post("/:id", adminProtect, updateBranch);
router.delete("/:id", adminProtect, deleteBranch);

module.exports = router;
