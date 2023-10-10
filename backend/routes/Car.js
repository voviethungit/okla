const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Car");
const Car = mongoose.model("Car");
const multer = require("multer");
const verifyToken = require("../middleware/auth");

// API UPLOAD CAR
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post("/upload-car", upload.single("image"), verifyToken, async (req, res) => {
  const { title, description, price, location, numberCar, brandCar } = req.body;
  const imagePath = req.file.filename;
  if (!title || !description || !price || !location || !numberCar || !brandCar)
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng nhập đầy đủ các thông tin !" });

  try {
    const newCar = new Car({
      title,
      description,
      price,
      location,
      numberCar,
      imagePath: req.file.filename,
      userPost: req.userId,
      brandCar
    });

    await newCar.save();

    res.json({ success: true, message: "THANH CONG!", car: newCar });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Lỗi từ phía server !" });
  }
});

// API get CAR
router.get("/get-car", verifyToken, async (req, res) => {
  try {
    const cars = await Car.find({});
    res.json({ success: true, cars });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// router post doi status cua car tu true sang false nho la phai dung token cua admin moi dc

// router put doi thong tin cua xe nguoi dung nao doi xe day

// tk mk admin va user

module.exports = router;
