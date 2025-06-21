import BackgroundVideo from "../models/backgroundVideoModel.js";
import fs from "fs";

export const getBackgroundVideos = async (req, res) => {
  try {
    const backgroundVideos = await BackgroundVideo.find();
    res.status(200).json(backgroundVideos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching background videos" });
  }
};

export const addBackgroundVideo = async (req, res) => {
  try {
    const { name } = req.body;
    const file = req.file;

    if (!name || !file) {
      return res
        .status(400)
        .json({ message: "Name and video file are required" });
    }

    const url = `/uploads/videos/${file.filename}`;

    // Check for existing video
    const existingVideo = await BackgroundVideo.findOne();

    if (existingVideo) {
      // Delete old video file
      const oldVideoPath = `uploads/videos/${existingVideo.url
        .split("/")
        .pop()}`;
      if (fs.existsSync(oldVideoPath)) {
        fs.unlinkSync(oldVideoPath);
      }

      // Update existing record
      existingVideo.name = name;
      existingVideo.url = url;
      await existingVideo.save();

      return res.status(200).json({
        success: true,
        message: "Background video updated successfully",
        data: existingVideo,
      });
    }

    // Create new video if none exists
    const newBackgroundVideo = new BackgroundVideo({ name, url });
    await newBackgroundVideo.save();

    res.status(201).json({
      success: true,
      message: "Video uploaded successfully",
      data: newBackgroundVideo,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Error uploading background video" });
  }
};
