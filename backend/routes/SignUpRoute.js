const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = mongoose.model("userInfo");
router.post("/register", async (req, res) => {
  const { fname, lname, email, password } = req.body;
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.send({ error: "User already Exists" });
    }
    await User.create({
      fname,    
      lname,
      email,
      password: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

module.exports = router;
