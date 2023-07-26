const mongoose = require("mongoose");
const { stringify } = require("uuid");

const UserDetailSchema = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: {type: String, unique: true},
    password: String,
  },
  {
    collection: "UserInfo",
  }
);

mongoose.model("userInfo", UserDetailSchema);
