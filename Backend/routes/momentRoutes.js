const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const validateMoment = require("../validator/momentValidator");
const {
  createMoment,
  getAllMoments,
  updateMoment,
  deleteMoment,
  getMomentsByUser
  
} = require("../controllers/momentController");

router.use(auth);
router.route("/").get(getAllMoments).post(validateMoment, createMoment);

router.route("/:id").put(updateMoment).delete(deleteMoment);
router.get("/user/:userId" , getMomentsByUser);
module.exports = router;
