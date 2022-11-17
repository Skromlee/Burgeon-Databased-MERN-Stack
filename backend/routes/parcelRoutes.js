const express = require("express");
const router = express.Router();
const {
    // method from controllers
    getParcels,
    registerParcel,
    updateParcel,
    deleteParcel,
    getParcelsById,
    getUserParcels,
} = require("../controllers/parcelController");
const { protect } = require("../middleware/authMiddleware");
const { adminProtect } = require("../middleware/adminAuthMiddleware");

router.route("/all").get(protect, getUserParcels);
router
    .route("/")
    .get(adminProtect, getParcels)
    .post(adminProtect, registerParcel);
router
    .route("/:id")
    .get(adminProtect, getParcelsById)
    .delete(adminProtect, deleteParcel)
    .put(adminProtect, updateParcel);

module.exports = router;
