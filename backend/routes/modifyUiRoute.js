import express from "express";
import {
  addHeroImage,
  addLogo,
  getLogo,
  getHeroImage,
} from "../controllers/modifyUiController.js";
import upload from "../middleware/multer.js";

const modifyUiRouter = express.Router();

// File upload routes
modifyUiRouter.post(
  "/upload_logo",
  upload.fields([{ name: "logo_img" }]),
  addLogo
);
modifyUiRouter.post(
  "/upload_hero",
  upload.fields([{ name: "hero_img" }]),
  addHeroImage
);

// Get routes
modifyUiRouter.get("/get_logo", getLogo);
modifyUiRouter.get("/get_hero", getHeroImage);

export default modifyUiRouter;
