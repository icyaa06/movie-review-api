const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/search", async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ message: "Query is required" });
  }

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          query: query
        }
      }
    );

    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ message: "TMDB API error" });
  }
});

module.exports = router;
