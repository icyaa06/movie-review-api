const Joi = require("joi");

exports.reviewSchema = Joi.object({
  movieId: Joi.number().required(),
  movieTitle: Joi.string().required(),
  rating: Joi.number().min(1).max(10).required(),
  comment: Joi.string().required()
});
