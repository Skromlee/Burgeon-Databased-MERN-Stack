const mongoose = require("mongoose");

const thailandSchema = {
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
        type: String,
    },
    region: {
        type: String,
    },
};

module.exports = mongoose.model("Thailand", thailandSchema);
