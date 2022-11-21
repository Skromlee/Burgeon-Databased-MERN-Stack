const express = require("express");
const router = express.Router();

const {
    registerGroup,
    getGroups,
    updateGroup,
    deleteGroup,
} = require("../controllers/groupController");

const { protect } = require("../middleware/authMiddleware");
const { adminProtect } = require("../middleware/adminAuthMiddleware");

// router.route("/all").get(protect, getUserParcels);
router
    .route("/")
    .get(adminProtect, getGroups)
    .post(adminProtect, registerGroup);
router
    .route("/:id")
    .put(adminProtect, updateGroup)
    .delete(adminProtect, deleteGroup);
//     .get(adminProtect, getParcelsById)

module.exports = router;
