const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  photo: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model("Upload", uploadSchema);
