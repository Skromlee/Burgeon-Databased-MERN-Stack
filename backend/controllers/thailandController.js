const asyncHandler = require("express-async-handler");
const Thailand = require("../models/thailandModel");

// @desc Get information by postcode
// @route POST /api/thailand/:id
// @access Private Only Manager
const getInformationByPostcode = asyncHandler(async (req, res) => {
    // req.params.postcode = Number(req.params.postcode);
    //
    // const test = 1;
    const pattern = "^" + req.params.postcode;

    const postcodeInformaiton = await Thailand.find({
        postcode: { $regex: pattern, $options: "" },
    });

    if (!postcodeInformaiton) {
        res.status(400);
        throw new Error("Postcode not found");
    }

    // Check for admin
    if (!req.admin) {
        res.status(401);
        throw new Error("Not authorized");
    }
    res.status(200).json(postcodeInformaiton);
});

module.exports = {
    getInformationByPostcode,
};
