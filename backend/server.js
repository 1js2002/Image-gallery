const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
require("./models/UserDetails");
const cors = require("cors");


const UploadRoute = require("./routes/UploadRoute");
const SignUpRoute = require("./routes/SignUpRoute");
const LoginRoute = require("./routes/LoginRoute");
const userDataRoute = require("./routes/UserDataRoute");


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
  
 
app.listen(PORT, () => console.log(`Server started at port ${PORT}...`));

app.use(UploadRoute);

app.use(SignUpRoute);

app.use(LoginRoute);

app.use(userDataRoute);
