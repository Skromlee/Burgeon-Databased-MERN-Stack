const express = require("express");
const router = express.Router();

const { registerGroup, getGroups } = require("../controllers/groupController");

const { protect } = require("../middleware/authMiddleware");
const { adminProtect } = require("../middleware/adminAuthMiddleware");

// router.route("/all").get(protect, getUserParcels);
router
    .route("/")
    .get(adminProtect, getGroups)
    .post(adminProtect, registerGroup);
// router
//     .route("/:id")
//     .get(adminProtect, getParcelsById)
//     .delete(adminProtect, deleteParcel)
//     .put(adminProtect, updateParcel);

module.exports = router;
