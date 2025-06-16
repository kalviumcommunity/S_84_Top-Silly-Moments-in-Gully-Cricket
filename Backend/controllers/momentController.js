const Moment = require("../models/Moment");

exports.createMoment = async (req, res, next) => {
  try {
    const moment = new Moment({
      ...req.body,
      createdBy: req.user.userId,
    });
    await moment.save();
    res.status(201).json({ message: "Moment added successfully" });
  } catch (err) {
    next(err);
  }
};

exports.getAllMoments = async (req, res, next) => {
  try {
    const moments = await Moment.find();
    res.status(200).json({ success: true, moments });
  } catch (err) {
    next(err);
  }
};

exports.getMomentsByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userMoments = await Moment.find({ createdBy: userId });
    res.status(200).json({ moments: userMoments });
  } catch (error) {
    next(error);
  }
};
exports.updateMoment = async (req, res, next) => {
  try {
    const moment = await Moment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!moment) return res.status(404).json({ message: "Moment not found" });
    res.status(200).json({ message: "Moment updated", moment });
  } catch (err) {
    next(err);
  }
};

exports.deleteMoment = async (req, res, next) => {
  try {
    const moment = await Moment.findByIdAndDelete(req.params.id);
    if (!moment) return res.status(404).json({ message: "Moment not found" });
    res.status(200).json({ message: "Moment deleted" });
  } catch (err) {
    next(err);
  }
};
