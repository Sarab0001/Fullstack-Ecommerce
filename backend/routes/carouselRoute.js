import express from "express";
import { getCarousel, addCarousel } from "../controllers/carouselController.js";

const carouselRouter = express.Router();

carouselRouter.get("/get_carousel", getCarousel);
carouselRouter.post("/add_carousel", addCarousel);

export default carouselRouter;
