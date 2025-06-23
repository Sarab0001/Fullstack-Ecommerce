import mongoose from "mongoose";
import Review from "../models/reviewModel.js";

export const addReview = async (req, res) => {
  try {
    const { rating, comment, productId } = req.body;

    if (!rating || !comment || !productId) {
      return res.status(400).json({
        success: false,
        message: "All fields (rating, comment, productId) are required",
      });
    }

    const newReview = new Review({
      rating,
      comment,
      productId,
      userId: req.user._id, // Assuming req.user is set by auth middleware
    });

    await newReview.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully",
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const getReviews = async (req, res) => {
  try {
    console.log("productId received:", req.params.productId); // Debug

    const { productId } = req.params;

    const reviews = await Review.find({
      productId: new mongoose.Types.ObjectId(productId),
    }).populate("userId", "name email");

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message }); // Add error message
  }
};
