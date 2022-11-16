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
        weight: {
            type: Number,
            required: [true, "Please add parcel weight"],
        },
        boxsize: {
            type: String,
            required: [true, "Please add box sizing"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Parcel", parcelSchema);
