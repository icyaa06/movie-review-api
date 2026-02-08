## Movie Review API
## Project Overview

Movie Review API is a RESTful backend application built using Node.js, Express.js, and MongoDB.
The application allows users to register, log in, and create movie reviews.
Each review is associated with an authenticated user and stored securely in the database.

The project follows a modular architecture with separate folders for routes, controllers, models, middleware, and configuration files.

## Technologies Used

Node.js

Express.js

MongoDB Atlas

Mongoose

JSON Web Tokens (JWT)

bcrypt

Joi

Render (deployment)

## Setup and Installation
1. Clone the repository

Clone the project and navigate to the project folder:

git clone https://github.com/your-username/movie-review-api.git

cd movie-review-api

2. Install dependencies

Install all required packages:

npm install

3. Environment variables

Create a .env file in the root directory and add the following variables:

PORT=10000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_api_key

4. Run the server locally

Start the server:

npm start

The server will run at:

http://localhost:10000

## API Documentation
-Authentication Routes (Public)

POST /api/auth/register
Registers a new user. Password is hashed before saving.

POST /api/auth/login
Authenticates the user and returns a JWT token.

-User Routes (Private)

GET /api/users/profile
Returns the profile of the logged-in user.

PUT /api/users/profile
Updates the profile of the logged-in user.

Authorization required:
Authorization: Bearer <token>

-Review Routes (Private)

POST /api/reviews
Creates a new movie review for the authenticated user.

GET /api/reviews
Returns all reviews created by the authenticated user.

GET /api/reviews/:id
Returns a specific review by its ID.

PUT /api/reviews/:id
Updates an existing review (only by its owner).

DELETE /api/reviews/:id
Deletes a review (only by its owner).

Authorization required:
Authorization: Bearer <token>

## Deployment

The backend application is deployed on Render and connected to MongoDB Atlas using environment variables.
The deployed API has been tested using Postman and works as expected.

Example deployed URL:

https://movie-review-api-3134.onrender.com


Author
Aisana Olzhabayeva, IT-2403