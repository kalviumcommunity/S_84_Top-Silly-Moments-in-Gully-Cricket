const express = require("express");
const router = express.Router();
const Moment = require("./models/moment");

// Adding a new moment
router.post("/moment", async (req, res, next) => {
  try {
    const newMoment = new Moment(req.body);
    await newMoment.save();
    res
      .status(201)
      .json({ success: true, message: "Moment added successfully" });
  } catch (error) {
    next(error);
  }
});

// Retrieving all moments
router.get("/moment", async (req, res, next) => {
  try {
    const allMoments = await Moment.find();
    res
      .status(200)
      .json({
        success: true,
        message: "All the moments recieved yet are as follows: ", allMoments
      });
  } catch (error) {
    next(error);
  }
});

//Updating a moment by its id
router.put('/moment/:id', async (req, res, next) => {
  try {
    const updateMoment = await Moment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateMoment)
      res.status(404).json({ success: false, message: "Moment not found" });

    res
      .status(200)
      .json({
        success: true,
        message: "Moment updated successfully",
        updateMoment,
      });
  } catch (error) {
    next(error);
  }
});

// Deleting a moment by its id
router.delete("/moment/:id", async (req, res, next) => {
  try {
    const deleteMoment = await Moment.findByIdAndDelete(req.params.id);
    if (!deleteMoment) res.status(404).json({ message: "Moment not found" });
    res
      .status(200)
      .json({ success: true, message: "Moment deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
