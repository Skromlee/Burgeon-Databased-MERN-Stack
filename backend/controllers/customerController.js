const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// Customer controllers

// @desc Update current Customer details
// @route POST /api/manages/customers/:id
// @access Private Only Manager
const updateCustomer = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(400);
        throw new Error("User not found");
    }

    // Check for admin
    if (!req.admin) {
        res.status(401);
        throw new Error("Not authorized");
    }

    const updatedEmployee = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );

    res.status(200).json(updatedEmployee);
});

// @desc Get customers data
// @route GET /api/manages/customers
// @access Private only manager
const getCustomers = asyncHandler(async (req, res) => {
    const user = await User.find({}).select("-password");
    res.status(200).json(user);
});

// @desc Delete customer
// @route DELETE /api/manages/customers/:id
// @access Private only manager
const deleteCustomer = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(400);
        throw new Error("User not found");
    }

    await user.remove();

    res.status(200).json({ id: req.params.id });
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

module.exports = {
    updateCustomer,
    getCustomers,
    deleteCustomer,
};
