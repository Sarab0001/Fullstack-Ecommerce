import express from "express";
import {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategories,
  subCategory,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

// Category routes
categoryRouter.post("/add_category", addCategory);
categoryRouter.get("/get_category", getCategories);
categoryRouter.put("/update_category/:id", updateCategory);
categoryRouter.delete("/delete_category/:id", deleteCategory);

// Subcategory routes
categoryRouter.post("/add_subcategory", subCategory);
categoryRouter.get("/get_subcategory", getSubCategories);
categoryRouter.put("/update_subcategory/:id", updateSubCategory);
categoryRouter.delete("/delete_subcategory/:id", deleteSubCategory);

export default categoryRouter;
