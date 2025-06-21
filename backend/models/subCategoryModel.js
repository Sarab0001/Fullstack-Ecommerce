import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const SubCategory = mongoose.model("SubCategory", SubCategorySchema);

export default SubCategory;
