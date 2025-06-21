import express from "express";
import { addFooter, getFooter } from "../controllers/footerController.js";

const footerRouter = express.Router();

// GET FOOTER
footerRouter.post("/post_footer", addFooter);
footerRouter.get("/get_footer", getFooter);

export default footerRouter;
