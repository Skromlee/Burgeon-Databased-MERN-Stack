const mongoose = require("mongoose");

const parcelSchema = mongoose.Schema(
    {
        sender: {
            type: Object,
            required: true,
        },
        receiver: {
            type: Object,
            required: true,
        },
        typeofshipment: {
            type: String,
            required: [true, "Please add type of shipment"],
        },
        typeofstuff: {
            type: String,
            required: [true, "Please add type of stuff"],
        },
        weight: {
            type: Number,
            required: [true, "Please add parcel weight"],
        },
        boxsize: {
            type: String,
            required: [true, "Please add box sizing"],
        },
        status: {
            isRegisterToBranch: {
                type: String,
                default: "false",
            },
            isOnTrevelling: {
                type: String,
                default: "false",
            },
            isOnDelivery: {
                type: String,
                default: "false",
            },
            isDelivered: {
                type: String,
                default: "false",
            },
        },
        isgroupped: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Parcel", parcelSchema);
