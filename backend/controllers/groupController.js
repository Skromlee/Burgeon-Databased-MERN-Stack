const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Parcel = require("../models/parcelModel");
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
    const {
        totalParcels,
        totalWeight,
        typeofshipment,
        typeofstuff,
        bagsize,
        parcelList,
        branch,
    } = req.body;

    const parcelListObjectId = [];
    parcelListObjectId.push(
        parcelList.map((each) => {
            return each._id;
        })
    );

    if (
        !totalParcels ||
        !totalWeight ||
        !typeofshipment ||
        !typeofstuff ||
        !bagsize ||
        !parcelList ||
        !branch
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
            parcelList: parcelListObjectId[0],
            branch,
        });
        res.status(200).json(newGroup);
    } catch (error) {
        console.log(error);
    }
});

// @desc Update group information
// @route PUT /api/groups/:id
// @access Private
const updateGroup = asyncHandler(async (req, res) => {
    const {
        bagsize,
        branch,
        parcelList,
        totalParcels,
        totalWeight,
        typeofshipment,
        typeofstuff,
    } = req.body;

    if (
        !bagsize ||
        !branch ||
        !parcelList ||
        !totalParcels ||
        !totalWeight ||
        !typeofshipment ||
        !typeofstuff
    ) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    const targetGroup = await Group.findById(req.params.id);

    if (!targetGroup) {
        res.status(400);
        throw new Error("Group not found");
    }

    const updatedGroupData = {
        bagsize,
        branch,
        parcelList,
        totalParcels,
        totalWeight,
        typeofshipment,
        typeofstuff,
    };

    const updatedGroup = await Group.findOneAndUpdate(
        req.params.id,
        updatedGroupData,
        { new: true }
    );

    res.status(200).json(updatedGroup);
});

// @desc Delete groups
// @route DELETE /api/groups/:id
// @access Private
const deleteGroup = asyncHandler(async (req, res) => {
    const group = await Group.findById(req.params.id);

    if (!group) {
        res.status(400);
        throw new Error("Group not found");
    }

    const { parcelList } = group;

    try {
        parcelList.forEach((element) => {
            Parcel.findByIdAndUpdate(element, { isgroupped: false }, (err) => {
                if (err) console.log(err);
            });
        });
        await group.remove();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        if (error) {
            console.log(error);
        }
    }
});

module.exports = {
    getGroups,
    registerGroup,
    updateGroup,
    deleteGroup,
    // getParcelsById,
    // getUserParcels,
};
