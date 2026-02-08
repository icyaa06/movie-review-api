const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    movieId: {
      type: Number,
      required: false
    },
    movieTitle: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 10,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
