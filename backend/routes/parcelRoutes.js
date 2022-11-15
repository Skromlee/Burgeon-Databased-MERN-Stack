const express = require("express");
const router = express.Router();
const {
  // method from controllers
  getParcels,
  registerParcel,
  updateParcel,
  deleteParcel,
} = require("../controllers/parcelController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getParcels).post(protect, registerParcel);
router.route("/:id").delete(protect, deleteParcel).put(protect, updateParcel);

module.exports = router;
