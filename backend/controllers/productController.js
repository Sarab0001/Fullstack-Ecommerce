import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
//Function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      originalPrice,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
      sizeChart, // ✅ added
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(Boolean);

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      originalPrice,
      price,
      subCategory,
      bestseller: bestseller === "true",
      sizes: JSON.parse(sizes),
      sizeChart: sizeChart ? JSON.parse(sizeChart) : [], // ✅ added
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Function for list products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Function for removing products
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for updating product
const updateProduct = async (req, res) => {
  try {
    const {
      productId,
      name,
      description,
      originalPrice,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
      sizeChart, // ✅ added
    } = req.body;

    let imagesUrl = [];

    if (req.files && Object.keys(req.files).length > 0) {
      const image1 = req.files.image1 && req.files.image1[0];
      const image2 = req.files.image2 && req.files.image2[0];
      const image3 = req.files.image3 && req.files.image3[0];
      const image4 = req.files.image4 && req.files.image4[0];

      const images = [image1, image2, image3, image4].filter(Boolean);

      imagesUrl = await Promise.all(
        images.map(async (item) => {
          let result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );
    }

    const updateFields = {
      name,
      description,
      category,
      originalPrice,
      price,
      subCategory,
      bestseller: bestseller === "true",
      sizes: JSON.parse(sizes),
      sizeChart: sizeChart ? JSON.parse(sizeChart) : [], // ✅ added
    };

    if (imagesUrl.length > 0) updateFields.image = imagesUrl;

    await productModel.findByIdAndUpdate(productId, updateFields);

    res.json({ success: true, message: "Product Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Function for single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
  updateProduct,
};
