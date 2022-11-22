const asyncHandler = require("express-async-handler");
const Parcel = require("../models/parcelModel");
const User = require("../models/userModel");
const { update } = require("../models/userModel");

// @desc Get parcels
// @route GET /api/parcels
// @access Private
const getParcels = asyncHandler(async (req, res) => {
    const parcels = await Parcel.find({});
    res.status(200).json(parcels);
});

// @desc Get User parcels
// @route GET /api/parcels
// @access Private
const getUserParcels = asyncHandler(async (req, res) => {
    const parcels = await Parcel.find({
        $or: [
            { "sender.citizen": req.user.citizen.toString() },
            { "receiver.citizen": req.user.citizen.toString() },
        ],
    });
    res.status(200).json(parcels);
});

// @desc Get parcels specific
// @route GET /api/parcels/:id
// @accesss Private
const getParcelsById = asyncHandler(async (req, res) => {
    const parcel = await Parcel.find({ _id: req.params.id });
    res.status(200).json(parcel);
});

// @desc Register new parcels
// @route POST /api/parcels
// @access Private // for Admin
const registerParcel = asyncHandler(async (req, res) => {
    const { sender, receiver, parcel } = req.body;
    const { weight, typeofshipment, typeofstuff, boxsize } = parcel;
    if (
        !sender.citizen ||
        !receiver.citizen ||
        !weight ||
        !typeofshipment ||
        !typeofstuff ||
        !boxsize
    ) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    try {
        const newParcel = await Parcel.create({
            sender,
            receiver,
            typeofshipment,
            weight,
            boxsize,
            typeofstuff,
            status: {
                isRegisterToBranch: "finish",
            },
        });
        res.status(200).json(newParcel);
    } catch (error) {
        console.log(error);
    }

    // res.status(200).json(req.body);
});

// @desc Update parcels status
// @route PUT /api/parcels/status/:id
// @access Private
const updateStatus = asyncHandler(async (req, res) => {
    const { _id, status } = req.body;
    if (!_id || !status) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    const targetParcel = await Parcel.findById(_id);

    if (!targetParcel) {
        res.status(400);
        throw new Error("Parcel not found");
    }

    const updatedParcel = await Parcel.findOneAndUpdate(
        { _id: _id },
        { status: status },
        {
            new: true,
        }
    );

    res.status(200).json(updatedParcel);
});

// @desc Update parcels information
// @route PUT /api/parcels/:id
// @access Private
const updateParcel = asyncHandler(async (req, res) => {
    const { sender, receiver, parcel } = req.body;
    const { weight, typeofshipment, typeofstuff, boxsize } = parcel;
    if (
        !sender.citizen ||
        !receiver.citizen ||
        !weight ||
        !typeofshipment ||
        !typeofstuff ||
        !boxsize
    ) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    const targetParcel = await Parcel.findById(req.params.id);

    if (!parcel) {
        res.status(400);
        throw new Error("Parcel not found");
    }

    const updatedParcelData = {
        sender,
        receiver,
        typeofshipment,
        weight,
        boxsize,
        typeofstuff,
    };

    const updatedParcel = await Parcel.findOneAndUpdate(
        req.params.id,
        updatedParcelData,
        {
            new: true,
        }
    );
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

    await parcel.remove();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getParcels,
    registerParcel,
    updateParcel,
    deleteParcel,
    getParcelsById,
    getUserParcels,
    updateStatus,
};
