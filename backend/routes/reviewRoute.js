import express from "express";
import { addReview, getReviews } from "../controllers/reviewController.js";
import authUser from "../middleware/auth.js";

const reviewRouter = express.Router();

reviewRouter.post("/add_review", authUser, addReview);
reviewRouter.get("/get_reviews/:productId", authUser, getReviews);

export default reviewRouter;
