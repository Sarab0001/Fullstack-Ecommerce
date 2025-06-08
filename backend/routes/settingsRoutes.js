import express from "express";
import {
  getSettings,
  updateSettings,
} from "../controllers/settingsController.js";

const settingsRouter = express.Router();

// Route to get background color
settingsRouter.get("/get_color", getSettings);

// Route to update background color
settingsRouter.post("/post_color", updateSettings);

export default settingsRouter;
