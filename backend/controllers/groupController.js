const asyncHandler = require("express-async-handler");
const Parcel = require("../models/parcelModel");
const User = require("../models/userModel");
const { update } = require("../models/userModel");
const Group = require("../models/groupModel");
// @desc Get groups
// @route GET /api/groups
// @access Private
const getGroups = asyncHandler(async (req, res) => {
    const groups = await Group.find({});
    res.status(200).json(groups);
});

// // @desc Get User parcels
// // @route GET /api/parcels
// // @access Private
// const getUserParcels = asyncHandler(async (req, res) => {
//     const parcels = await Parcel.find({
//         $or: [
//             { "sender.citizen": req.user.citizen.toString() },
//             { "receiver.citizen": req.user.citizen.toString() },
//         ],
//     });
//     res.status(200).json(parcels);
// });

// // @desc Get parcels specific
// // @route GET /api/parcels/:id
// // @accesss Private
// const getParcelsById = asyncHandler(async (req, res) => {
//     const parcel = await Parcel.find({ _id: req.params.id });
//     res.status(200).json(parcel);
// });

// @desc Register new group
// @route POST /api/groups
// @access Private // for Admin
const registerGroup = asyncHandler(async (req, res) => {
    console.log(" -------------Register------------- ");
    console.log(req.body);

    const {
        totalParcels,
        totalWeight,
        typeofshipment,
        typeofstuff,
        bagsize,
        parcelList,
    } = req.body;

    if (
        !totalParcels ||
        !totalWeight ||
        !typeofshipment ||
        !typeofstuff ||
        !bagsize ||
        !parcelList
    ) {
        res.status(400);
        throw new Error("Plead add all fields");
    }

    try {
        parcelList.map((each) => {
            Parcel.findByIdAndUpdate(each._id, { isgroupped: true }, (err) => {
                if (err) console.log(err);
            });
        });
        const newGroup = await Group.create({
            totalParcels,
            totalWeight,
            typeofshipment,
            typeofstuff,
            bagsize,
            parcelList,
        });
        res.status(200).json(newGroup);
    } catch (error) {
        console.log(error);
    }
});

// @desc Update group information
// @route PUT /api/groups/:id
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

// @desc Delete groups
// @route DELETE /api/groups/:id
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
    getGroups,
    registerGroup,
    updateParcel,
    deleteParcel,
    // getParcelsById,
    // getUserParcels,
};
