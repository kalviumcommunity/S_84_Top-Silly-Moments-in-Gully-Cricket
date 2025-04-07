const Joi = require("joi");

const momentsValidation = Joi.object({
  title: Joi.string().min(5).max(30).required(),
  description: Joi.string().min(10).max(500).required(),
  location: Joi.string().required(),
  submittedBy: Joi.string().required()
});

const ValidateMoment = (req, res, next) => {
  const { error } = momentsValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = ValidateMoment;
