const mongoose = require("mongoose");

const parcelSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
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
});

module.exports = mongoose.model("Parcel", parcelSchema);
