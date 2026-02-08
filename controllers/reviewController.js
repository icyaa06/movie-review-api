const Review = require("../models/Review");
const { reviewSchema } = require("../validations/reviewValidation");

// Create a new review (private)
exports.createReview = async (req, res, next) => {
  try {
    const { error } = reviewSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const review = await Review.create({
      ...req.body,
      user: req.user.id
    });

    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

// Get ALL MY reviews (private) ✅ requirement
exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("user", "username");
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

// Get one review by ID (private: only owner)
exports.getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findOne({ _id: req.params.id, user: req.user.id })
      .populate("user", "username");

    if (!review) return res.status(404).json({ message: "Not found" });
    res.json(review);
  } catch (err) {
    next(err);
  }
};

// Update review (private: only owner)
exports.updateReview = async (req, res, next) => {
  try {
    const review = await Review.findOne({ _id: req.params.id, user: req.user.id });
    if (!review) return res.status(404).json({ message: "Not found" });

    Object.assign(review, req.body);
    await review.save();

    res.json(review);
  } catch (err) {
    next(err);
  }
};

// Delete review (private: only owner)
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findOne({ _id: req.params.id, user: req.user.id });
    if (!review) return res.status(404).json({ message: "Not found" });

    await review.deleteOne();
    res.json({ message: "Review deleted" });
  } catch (err) {
    next(err);
  }
};

// ✅ Public: see other users’ reviews (NEW, does not change existing endpoints)
exports.getPublicReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .populate("user", "username");
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};
