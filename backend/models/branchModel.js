const mongoose = require("mongoose");

const branchSchema = mongoose.Schema(
    {
        branchName: {
            type: String,
            required: [true, "Please add branch name"],
        },
        addressNo: {
            type: String,
            required: [true, "Please add address number"],
        },
        province: {
            type: String,
            required: [true, "Please add a province"],
        },
        district: {
            type: String,
            required: [true, "Please add a district"],
        },
        subdistrict: {
            type: String,
            required: [true, "Please add a subdistrict"],
        },
        postcode: {
            type: Number,
            required: [true, "Please add a postcode"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Branch", branchSchema);
