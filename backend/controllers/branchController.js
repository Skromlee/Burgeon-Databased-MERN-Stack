const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Branch = require("../models/branchModel");

// @desc Register new Branch
// @route POST /api/branch
// @access Private Only Manager
const createBranch = asyncHandler(async (req, res) => {
    ("create branch!--------------------");
    const { branchName, addressNo, province, district, subdistrict, postcode } =
        req.body;

    if (
        !branchName ||
        !addressNo ||
        !province ||
        !district ||
        !subdistrict ||
        !postcode
    ) {
        res.status(400);
        throw new Error("Please add all required fields");
    }

    // Create Employee
    const branch = await Branch.create({
        branchName,
        addressNo,
        province,
        district,
        subdistrict,
        postcode,
    });

    if (branch) {
        res.status(201).json({
            _id: branch.id,
            branchName: branch.branchName,
            address: {
                addressNo: branch.addressNo,
                province: branch.province,
                district: branch.district,
                subdistrict: branch.subdistrict,
                postcode: branch.postcode,
            },
            token: generateToken(branch._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid branch data");
    }
});

// @desc Update current Branch details
// @route POST /api/branch/:id
// @access Private Only Manager
const updateBranch = asyncHandler(async (req, res) => {
    const branch = await Branch.findById(req.params.id);

    if (!branch) {
        res.status(400);
        throw new Error("Branch not found");
    }

    // Check for admin
    if (!req.admin) {
        res.status(401);
        throw new Error("Not authorized");
    }

    const updateBranch = await Branch.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );

    res.status(200).json(updateBranch);
});

// @desc Get Branchs data
// @route GET /api/branch
// @access Private only manager
const getBranchs = asyncHandler(async (req, res) => {
    const branchs = await Branch.find({});
    res.status(200).json(branchs);
});

// @desc Delete branch
// @route DELETE /api/branch/:id
// @access Private only manager
const deleteBranch = asyncHandler(async (req, res) => {
    const branch = await Branch.findById(req.params.id);

    if (!branch) {
        res.status(400);
        throw new Error("Branch not found");
    }

    await branch.remove();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    createBranch,
    getBranchs,
    updateBranch,
    deleteBranch,
};
