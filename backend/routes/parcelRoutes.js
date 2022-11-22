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
    updateStatus,
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
router.put("/status/:id", adminProtect, updateStatus);

module.exports = router;
