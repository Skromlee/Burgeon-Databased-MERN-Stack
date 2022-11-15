const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");

// @desc Register new admin
// @route POST /api/admin/
// @access Public for now
const registerAdmin = asyncHandler(async (req, res) => {
    const {
        email,
        password,
        role,
        // firstname,
        // lastname,
        // phone,
        // citizen,
        // addressNo,
        // province,
        // district,
        // subdistrict,
        // postcode,
        // dob,
    } = req.body;

    if (!email && !password) {
        res.status(400);
        throw new Error("Please add all required fields");
    }

    //Check if admin exists
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
        res.status(400);
        throw new Error("Admin already exists");
    }

    // Hash password goes here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin
    const admin = await Admin.create({
        email,
        password: hashedPassword,
        role,
        // firstname,
        // lastname,
        // phone,
        // citizen,
        // addressNo,
        // province,
        // district,
        // subdistrict,
        // postcode,
        // dob,
    });

    if (admin) {
        res.status(201).json({
            _id: admin.id,
            // fullname: user.firstname + " " + user.lastname,
            email: admin.email,
            role: admin.role,
            // phone: user.phone,
            // citizen: user.citizen,
            // address: {
            //     addressNo: user.addressNo,
            //     province: user.province,
            //     district: user.district,
            //     subdistrict: user.subdistrict,
            //     postcode: user.postcode,
            // },
            // dob: user.dob,
            token: generateToken(admin._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc Authenticate a admin
// @route POST /api/admin/login
// @access Public
const loginAdmin = asyncHandler(async (req, res) => {
    req.body;
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    admin;
    if (admin && (await bcrypt.compare(password, admin.password))) {
        res.json({
            _id: admin.id,
            // fullname: user.firstname + " " + user.lastname,
            email: admin.email,
            role: admin.role,
            token: generateToken(admin._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid credentails");
    }
});

// // @desc Get user data
// // @route GET /api/users/me
// // @access Private
// const getMe = asyncHandler(async (req, res) => {
//     res.status(200).json(req.user);
// });

// // @desc Update a user information
// // @route PUT /api/users/:id
// // @access Private
// const updateUser = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.params.id);

//     if (!user) {
//         res.status(400);
//         throw new Error("User not found");
//     }

//     const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//     }).select("-password");

//     res.status(200).json(updatedUser);
// });

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_ADMIN_SECRET, {
        expiresIn: "30d",
    });
};

module.exports = {
    registerAdmin,
    loginAdmin,
    // getMe,
    // updateUser,
};
