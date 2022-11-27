const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true,
        },
        password: {
            type: String,
            require: [true, "Please add a password"],
        },
        firstname: {
            type: String,
        },
        lastname: {
            type: String,
        },
        phone: {
            type: Number,
        },
        citizen: {
            type: Number,
            unique: true,
        },
        addressNo: {
            type: String,
        },
        province: {
            type: String,
        },
        district: {
            type: String,
        },
        subdistrict: {
            type: String,
        },
        postcode: {
            type: Number,
        },
        dob: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
