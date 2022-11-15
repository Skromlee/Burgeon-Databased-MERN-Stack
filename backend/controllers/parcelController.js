const asyncHandler = require("express-async-handler");
const Parcel = require("../models/parcelModel");
const { update } = require("../models/userModel");
const User = require("../models/userModel");

// getParcels,
// registerParcel,
// updateParcel,
// deleteParcel,

// @desc Get parcels
// @route GET /api/parcels
// @access Private
const getParcels = asyncHandler(async (req, res) => {
  const parcels = await Parcel.find({ user: req.user.id });

  res.status(200).json(parcels);
});

// @desc Register new parcels
// @route POST /api/parcels
// @access Private // for Admin
const registerParcel = asyncHandler(async (req, res) => {
  const { typeofshipment, weight, boxsize, userid } = req.body;
  if (!typeofshipment || !weight || !boxsize || !userid) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const parcel = await Parcel.create({
    user: userid,
    typeofshipment,
    weight,
    boxsize,
  });

  res.status(200).json(parcel);
});

// @desc Update parcels information
// @route PUT /api/parcels/:id
// @access Private
const updateParcel = asyncHandler(async (req, res) => {
  const parcel = await Parcel.findById(req.params.id);

  if (!parcel) {
    res.status(400);
    throw new Error("Parcel not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the parcel user
  if (parcel.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedParcel = await Parcel.findOneAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedParcel);
});

// @desc Delete parcels
// @route DELETE /api/parcels/:id
// @access Private
const deleteParcel = asyncHandler(async (req, res) => {
  const parcel = await Parcel.findById(req.params.id);

  if (!parcel) {
    res.status(400);
    throw new Error("Parcel not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the parcel user
  if (parcel.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await parcel.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getParcels,
  registerParcel,
  updateParcel,
  deleteParcel,
};
