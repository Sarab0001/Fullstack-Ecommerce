import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editSubCategoryId, setEditSubCategoryId] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${backendUrl}api/category/get_category`);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      toast.error("Failed to fetch categories");
    }
  };

  const fetchSubCategories = async () => {
    try {
      const res = await axios.get(`${backendUrl}api/category/get_subcategory`);
      setSubCategories(res.data);
    } catch (err) {
      console.error("Error fetching subcategories:", err);
      toast.error("Failed to fetch subcategories");
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (category.trim() === "") return;

    try {
      if (editCategoryId) {
        await axios.put(
          `${backendUrl}api/category/update_category/${editCategoryId}`,
          {
            name: category,
          }
        );
        toast.success("Category updated successfully");
        setEditCategoryId(null);
      } else {
        await axios.post(`${backendUrl}api/category/add_category`, {
          name: category,
        });
        toast.success("Category added successfully");
      }
      setCategory("");
      fetchCategories();
    } catch (err) {
      console.error("Error saving category:", err);
      toast.error("Failed to save category");
    }
  };

  const handleSubCategorySubmit = async (e) => {
    e.preventDefault();
    if (subCategory.trim() === "") return;

    try {
      if (editSubCategoryId) {
        await axios.put(
          `${backendUrl}api/category/update_subcategory/${editSubCategoryId}`,
          { name: subCategory }
        );
        toast.success("Subcategory updated successfully");
        setEditSubCategoryId(null);
      } else {
        await axios.post(`${backendUrl}api/category/add_subcategory`, {
          name: subCategory,
        });
        toast.success("Subcategory added successfully");
      }
      setSubCategory("");
      fetchSubCategories();
    } catch (err) {
      console.error("Error saving subcategory:", err);
      toast.error("Failed to save subcategory");
    }
  };

  const handleEditCategory = (cat) => {
    setEditCategoryId(cat._id);
    setCategory(cat.name);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`${backendUrl}api/category/delete_category/${id}`);
      toast.success("Category deleted successfully");
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
      toast.error("Failed to delete category");
    }
  };

  const handleEditSubCategory = (sub) => {
    setEditSubCategoryId(sub._id);
    setSubCategory(sub.name);
  };

  const handleDeleteSubCategory = async (id) => {
    try {
      await axios.delete(`${backendUrl}api/category/delete_subcategory/${id}`);
      toast.success("Subcategory deleted successfully");
      fetchSubCategories();
    } catch (err) {
      console.error("Error deleting subcategory:", err);
      toast.error("Failed to delete subcategory");
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Category Card */}
        <div className="bg-white p-6 rounded shadow-md flex flex-col">
          <h1 className="text-3xl font-bold mb-4 border-b pb-2">
            Add Category
          </h1>
          <form className="mb-6" onSubmit={handleCategorySubmit}>
            <div className="mb-3">
              <label
                htmlFor="category"
                className="block text-gray-700 text-sm font-semibold mb-1"
              >
                Category Name
              </label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category name"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
            >
              {editCategoryId ? "Update" : "Add"} Category
            </button>
          </form>

          {categories.length > 0 && (
            <div className="flex-grow overflow-auto">
              <h2 className="text-2xl font-semibold mb-3">Categories</h2>
              <ul className="space-y-2 max-h-[320px] overflow-y-auto">
                {categories.map((cat) => (
                  <li
                    key={cat._id}
                    className="flex justify-between items-center bg-gray-50 p-3 rounded shadow-sm"
                  >
                    <span className="font-medium">{cat.name}</span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditCategory(cat)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Subcategory Card */}
        <div className="bg-white p-6 rounded shadow-md flex flex-col">
          <h1 className="text-3xl font-bold mb-4 border-b pb-2">
            Add Subcategory
          </h1>
          <form className="mb-6" onSubmit={handleSubCategorySubmit}>
            <div className="mb-3">
              <label
                htmlFor="subcategory"
                className="block text-gray-700 text-sm font-semibold mb-1"
              >
                Subcategory Name
              </label>
              <input
                type="text"
                id="subcategory"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                placeholder="Enter subcategory name"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
            >
              {editSubCategoryId ? "Update" : "Add"} Subcategory
            </button>
          </form>

          {subCategories.length > 0 && (
            <div className="flex-grow overflow-auto">
              <h2 className="text-2xl font-semibold mb-3">Subcategories</h2>
              <ul className="space-y-2 max-h-[320px] overflow-y-auto">
                {subCategories.map((sub) => (
                  <li
                    key={sub._id}
                    className="flex justify-between items-center bg-gray-50 p-3 rounded shadow-sm"
                  >
                    <span className="font-medium">{sub.name}</span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditSubCategory(sub)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSubCategory(sub._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default AddCategory;
