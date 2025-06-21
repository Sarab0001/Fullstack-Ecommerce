import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure directory exists
const videoPath = "uploads/videos/";
if (!fs.existsSync(videoPath)) {
  fs.mkdirSync(videoPath, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, videoPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export default upload;
