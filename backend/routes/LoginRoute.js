const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const JWT_SECRET = "sdadkafnaf231bhh3hvgv31u2v31g1vf";

const User = mongoose.model("userInfo");
router.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ error: "User Not Found" });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({email:user.email}, JWT_SECRET);
      if (res.status(201)) {
        return res.json({ status: "ok", data: token });
      } else {
        return res.json({ error: "error" });
      }
    }
    res.json({status: "error", error: "Invalid Password"})
});

module.exports = router;