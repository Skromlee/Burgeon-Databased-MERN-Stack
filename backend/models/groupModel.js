import mongoose from "mongoose";

const groupSchema = mongoose.Schema(
    {
        parcelList: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Group", groupSchema);
