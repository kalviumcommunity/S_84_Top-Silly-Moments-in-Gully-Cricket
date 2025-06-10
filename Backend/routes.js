const express = require("express");
const router = express.Router();
const Moment = require("./models/moment");
const ValidateMoment = require("./validator/momentsValidator");

const auth = require("./middleware"); 

router.use(express.json());

// Protected all /moments routes:
router.use("/moments", auth);

// Adding a new moment (protected)
router.post("/moments", ValidateMoment, async (req, res, next) => {
  try {
    const newMoment = new Moment({
      ...req.body,
      createdBy: req.user.userId,
    });
    await newMoment.save();
    res
      .status(201)
      .json({ success: true, message: "Moment added successfully" });
  } catch (error) {
    next(error);
  }
});

// Retrieving all moments (protected)
router.get("/moments", async (req, res, next) => {
  try {
    const allMoments = await Moment.find();
    res.status(200).json({
      success: true,
      message: "All moments are as follows:",
      moments: allMoments,
    });
  } catch (error) {
    next(error);
  }
});

// Updating a moment by its id (protected)
router.put("/moments/:id", async (req, res, next) => {
  try {
    const updateMoment = await Moment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateMoment)
      return res
        .status(404)
        .json({ success: false, message: "Moment not found" });

    res.status(200).json({
      success: true,
      message: "Moment updated successfully",
      updateMoment,
    });
  } catch (error) {
    next(error);
  }
});

// Deleting a moment by its id (protected)
router.delete("/moments/:id", async (req, res, next) => {
  try {
    const deleted = await Moment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Moment not found" });

    res
      .status(200)
      .json({ success: true, message: "Moment deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
