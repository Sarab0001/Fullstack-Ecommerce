import Category from "../models/categoryModel.js";
import SubCategory from "../models/subCategoryModel.js";

// Function to add a new category
export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json({ message: "Category added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding category", error });
  }
};

// Function to add a new subcategory
export const subCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newSubCategory = new SubCategory({ name });
    await newSubCategory.save();
    res.status(201).json({ message: "Subcategory added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding subcategory", error });
  }
};

// Function to get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// Function to get all subcategories
export const getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find();
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subcategories", error });
  }
};

// Function to delete a category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};

// Function to delete a subcategory
export const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await SubCategory.findByIdAndDelete(id);
    res.status(200).json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting subcategory", error });
  }
};

// Function to update a category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await Category.findByIdAndUpdate(id, { name });
    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};

// Function to update a subcategory
export const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await SubCategory.findByIdAndUpdate(id, { name });
    res.status(200).json({ message: "Subcategory updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating subcategory", error });
  }
};
