# 🎬 Movie Review API

## Project Overview
Movie Review API is a RESTful backend application built with Node.js, Express.js, and MongoDB.  
The system allows users to register, authenticate, and create movie reviews.  
Each review is linked to an authenticated user and contains a movie rating and comment.

The project follows a modular MVC structure with proper separation of concerns.

---

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcryptjs
- Joi
- dotenv
- Axios
- Postman

---

## Project Structure
movie-review-api/
│
├── config/
│ └── db.js
│
├── controllers/
│ ├── authController.js
│ ├── userController.js
│ └── reviewController.js
│
├── middleware/
│ ├── authMiddleware.js
│ └── errorMiddleware.js
│
├── models/
│ ├── User.js
│ └── Review.js
│
├── routes/
│ ├── authRoutes.js
│ ├── userRoutes.js
│ └── reviewRoutes.js
│
├── validations/
│ ├── authValidation.js
│ └── reviewValidation.js
│
├── .env
├── server.js
└── README.md


---

## Setup & Installation

1️. Install dependencies
```bash
npm install
2️. Environment variables
Create a .env file in the root directory:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/movie_review_db
JWT_SECRET=your_secret_key
TMDB_API_KEY=your_tmdb_api_key
3️. Run the server
Development mode:
npm run dev

Production mode:
npm start

Server will run on:
http://localhost:5000


##Authentication
Authentication is implemented using JWT.

After login, the client receives a token.
This token must be included in the request headers for protected routes:

##Authorization: Bearer <token>

##API Endpoints
-Authentication (Public)
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login and receive JWT
-User (Private)
Method	Endpoint	Description
GET	/api/users/profile	Get logged-in user profile
PUT	/api/users/profile	Update user profile
-Reviews (Private)
Method	Endpoint	Description
POST	/api/reviews	Create a movie review
GET	/api/reviews	Get all user reviews
GET	/api/reviews/:id	Get review by ID
PUT	/api/reviews/:id	Update review
DELETE	/api/reviews/:id	Delete review


##External API Integration
The project integrates The Movie Database (TMDB) API.

The external API is used only to fetch movie information such as movie titles or IDs.
Movie reviews are stored locally in MongoDB and linked to authenticated users.

Example request:
https://api.themoviedb.org/3/search/movie?api_key=YOUR_KEY&query=batman

##Testing
All API endpoints were tested using Postman, including:
-Authentication
-Authorization
-Validation
-CRUD operations

##Deployment
The backend was deployed with Render platform.
All sensitive data is stored using environment variables.


Author: Aisana Olzhabayeva IT-2403
WEB2 Final Project
Movie Review API

