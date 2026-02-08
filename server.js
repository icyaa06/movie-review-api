const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());



app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/movies", require("./routes/movieRoutes"));


const PORT = process.env.PORT || 10000;
app.listen(PORT,'0.0.0.0', () => console.log(`Server running on port ${PORT}`));
