require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/Auth");
const carRouter = require("./routes/Car");
const userRouter = require("./routes/User");
// Khai báo database
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pv6rkef.mongodb.net/GoodCarRental?retryWrites=true&w=majority`
    );
    console.log("Connect DB Thanh Cong");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
connectDB();
app.use(express.json());
app.use(cors());


// API AUTH
app.use("/", authRouter);

// API CAR
app.use("/", carRouter);

// API USER DETAILS
app.use("/", userRouter);

// API SERVER
app.listen(process.env.PORT, () => {
  console.log(
    `Server dang chay tai PORT : http://localhost:${process.env.PORT}/`
  );
});
