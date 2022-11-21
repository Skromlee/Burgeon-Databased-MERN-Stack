const mongoose = require("mongoose");

const groupSchema = mongoose.Schema(
    {
        totalWeight: Number,
        totalParcels: Number,
        typeofshipment: String,
        typeofstuff: String,
        bagsize: String,
        parcelList: {
            type: Array,
            default: [],
        },
        branch: mongoose.Schema.Types.ObjectId,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Group", groupSchema);
