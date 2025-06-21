import express from "express";
import {
  getBackgroundVideos,
  addBackgroundVideo,
} from "../controllers/backgrondVideoController.js";
import upload from "../middleware/upload.js";

const backgroundVideoRouter = express.Router();

// Route to get the background video
backgroundVideoRouter.get("/get_video", getBackgroundVideos);

// Route to add a new background video
backgroundVideoRouter.post(
  "/add_video",
  upload.single("video"),
  addBackgroundVideo
);

export default backgroundVideoRouter;
