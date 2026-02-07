const Review = require("../models/Review");
const { reviewSchema } = require("../validations/reviewValidation");

exports.createReview = async (req, res) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const review = await Review.create({
    ...req.body,
    user: req.user.id
  });

  res.status(201).json(review);
};

exports.getReviews = async (req, res) => {
  const reviews = await Review.find({ user: req.user.id });
  res.json(reviews);
};

exports.getReviewById = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: "Not found" });

  res.json(review);
};

exports.updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review)
    return res.status(404).json({ message: "Not found" });

  if (review.user.toString() !== req.user.id)
    return res.status(401).json({ message: "Not authorized" });

  Object.assign(review, req.body);
  await review.save();

  res.json(review);
};

exports.deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review)
    return res.status(404).json({ message: "Not found" });

  if (review.user.toString() !== req.user.id)
    return res.status(401).json({ message: "Not authorized" });

  await review.deleteOne();
  res.json({ message: "Review deleted" });
};
