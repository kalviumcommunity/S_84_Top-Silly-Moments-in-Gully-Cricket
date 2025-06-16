const mongoose = require("mongoose");

const MomentSchema = new mongoose.Schema({
  title: { type: String, required: true, minLength: 5 },
  location: { type: String, required: true },
  description: { type: String, required: true },
  submittedBy: { type: String, required: true },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Moment = mongoose.model("Moment", MomentSchema);
module.exports = Moment;
