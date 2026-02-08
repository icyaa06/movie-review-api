const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
  getPublicReviews
} = require("../controllers/reviewController");

const router = express.Router();

router.get("/public", getPublicReviews);

router.post("/", auth, createReview);
router.get("/", auth, getReviews);
router.get("/:id", auth, getReviewById);
router.put("/:id", auth, updateReview);
router.delete("/:id", auth, deleteReview);

module.exports = router;
