const Joi = require("joi");

const momentSchema = Joi.object({
  title: Joi.string().min(5).max(30).required(),
  description: Joi.string().min(10).max(500).required(),
  location: Joi.string().required(),
  submittedBy: Joi.string().required(),
});

const validateMoment = (req, res, next) => {
  const { error } = momentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateMoment;
