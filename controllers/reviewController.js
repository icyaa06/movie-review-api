const Review = require("../models/Review");
const { reviewSchema } = require("../validations/reviewValidation");

// Create a new review (requires login)
exports.createReview = async (req, res) => {
  try {
    const { error } = reviewSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const review = await Review.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all reviews 
exports.getReviews = async (req, res) => {
  try {
    // Populate user info (first and last name) for display
    const reviews = await Review.find().populate("user", "first_name last_name");
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single review by ID
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate("user", "first_name last_name");
    if (!review) return res.status(404).json({ message: "Not found" });

    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a review (only by the author)
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) return res.status(404).json({ message: "Not found" });
    if (review.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    Object.assign(review, req.body);
    await review.save();

    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a review (only by the author)
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) return res.status(404).json({ message: "Not found" });
    if (review.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    await review.deleteOne();
    res.json({ message: "Review deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
